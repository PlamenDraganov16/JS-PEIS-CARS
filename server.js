require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Car = require('./models/car');
const Purchase = require('./models/buy');
const Review = require('./models/review');


const multer = require('multer');
const fs = require('fs');
const path = require('path');

const server = express();

mongoose.connect(process.env.MONGODBURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



server.set('view engine', 'ejs');

server.listen(3000);

console.log('Server is running at: http://localhost:3000')

server.use(express.static('public'));
server.use('/cars', express.static('public/cars'));
server.use(morgan('dev'));
server.use(express.urlencoded({extended: true}));

server.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const carId = req.carId; 
        const uploadDir = path.join(__dirname, 'public/cars', carId.toString());
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

server.get('/', (req, res) => {
    res.redirect('./home');
})

server.get('/home', (req, res) => {
    res.render('index', {title: 'Welcome'});
})

server.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

server.get('/addcar', (req, res) => {
    res.render('addcar', {title: 'Add new car'});
})

server.get('/catalogue/:id', (req, res) => {
    const id = req.params.id;

    Car.findById(id)
    .then(carResult => {
        Review.find().sort({ createdAt: -1 })
        .then(reviewResult => {
            res.render('details', { 
                car: carResult, 
                title: 'Details', 
                reviews: reviewResult 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error fetching reviews");
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error fetching car details");
    });
});


server.get('/catalogue', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let cars = [];

        if (searchTerm) {
            cars = await Car.find({ name: { $regex: searchTerm, $options: 'i' } }); 
        } else {
            cars = await Car.find().sort({ createdAt: -1 });
        }

        res.render('catalogue', { cars, title: "Our Cars" });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

server.post('/addcar', (req, res, next) => {
    req.carId = new mongoose.Types.ObjectId();
    next();
}, upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No images uploaded.");
    }

    const imagePaths = req.files.map(file => `cars/${req.carId}/${file.filename}`);

    const newCar = new Car({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        fuel: req.body.fuel,
        type: req.body.type,
        brand: req.body.brand,
        transmission: req.body.transmission,
        shortDescr: req.body.shortDescr,
        longDescr: req.body.longDescr,
        images: imagePaths 
    });

    newCar.save()
        .then(() => {
            res.redirect('/catalogue');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error saving the car data");
        });
});

server.get('/editcar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const car = await Car.findById(id);
        if (!car) return res.status(404).send("Car not found");
        
        res.render('editcar', { title: "Edit Car", car });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

server.post('/catalogue/:id', (req, res) => {
    
    if (req.body.formType === 'purchase') {
        const newPurchase = new Purchase(req.body);

        newPurchase.save()
        .then(() => {
            res.redirect('/catalogue');
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Error making the purchase");
        })

    } else if (req.body.formType === 'review') {

        const newReview = new Review(req.body)

        newReview.save()
        .then(() => {
        res.redirect('/catalogue');
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Error making the review");
        })
        

    } else {
        res.status(400).send("Invalid form submission");
    }
});

server.post('/editcar/:id', upload.array('images', 10), async (req, res) => {
    try {
        const { name, description, price, fuel, type, brand, transmission, shortDescr, longDescr } = req.body;
        const carId = req.params.id;

        let car = await Car.findById(carId);
        if (!car) return res.status(404).send("Car not found");

        car.name = name;
        car.description = description;
        car.price = price;
        car.fuel = fuel;
        car.type = type;
        car.brand = brand;
        car.transmission = transmission;
        car.shortDescr = shortDescr;
        car.longDescr = longDescr;

        await car.save();
        res.redirect('/catalogue');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating car details");
    }
});
