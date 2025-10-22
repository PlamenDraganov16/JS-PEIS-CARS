const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = require('../models/car');
const Purchase = require('../models/buy');
const Review = require('../models/review');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwtSecret = process.env.JWT_SECRET;

const { storage } = require('../config/cloudinary');
const upload = multer({ storage })

const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
        res.redirect('/login');
        return;
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
        res.redirect('/login')
        return;
    }
}


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const carId = req.carId; 
//         const uploadDir = path.join(__dirname, '..', '..', 'public', 'cars', carId.toString());
//         fs.mkdirSync(uploadDir, { recursive: true });
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         //if file photo is photo1.jpg new is carId Number.jpg
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });

// const upload = multer({ storage: storage });

// GET NEW CAR **

router.get('/addcar', authMiddleware, (req, res) => {
    res.render('addcar', {title: 'Add new car'});
})

// GET DASHBOARD **

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        let reviews = await Review.find().sort({ createdAt: -1});
        try {
            let purchases = await Purchase.find().sort({ createdAt: -1});
            res.render('admin/dashboard', {reviews, purchases, title: "Dashboard"});
        } catch(err) {
            console.log(err);
            res.status(500).send('Error Fetching Purchases');
        } 
    } catch(err) {
        console.log(err);
        res.status(500).send('Error Fetching Reviews');
    }
});

// GET CAR LIST **

router.get('/carposts', authMiddleware, async(req, res) => {
    try {
        let cars = await Car.find().sort({ createdAt: -1 });
        res.render('admin/cars', { cars, title: "Dashboard" });

   } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
   }
})

// GET EDIT CAR

router.get('/editcar/:id', authMiddleware, async (req, res) => {
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

// POST NEW CAR **

router.post('/addcar', authMiddleware, (req, res, next) => {
    req.carId = new mongoose.Types.ObjectId();
    next();
}, upload.array('images', 15), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No images uploaded.");
    }

    // const imagePaths = req.files.map(file => `cars/${req.carId}/${file.filename}`);
    const imagePaths = req.files.map(file => file.path);

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
            res.redirect('/dashboard');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error saving the car data");
        });
});

// POST EDIT CAR

router.post('/editcar/:id', upload.array('images', 10), authMiddleware, async (req, res) => {
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

// POST LOGIN ADMIN **

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne( { username } );
    
        if(!user) {
          return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(!isPasswordValid) {
          return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const token = jwt.sign({ userId: user._id}, jwtSecret ); //for the cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    
      } catch (error) {
        console.log(error);
      }
})

// POST REGISTER ADMIN **

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPass = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({username, password: hashedPass});
            res.status(201).json({message: 'User Created', user});
        } catch (err) {
            if(err.code === 11000) {
                res.status(409).json({ message: 'User already in use'});
            }
            res.status(500).json({ message: 'Internal server error'})
        }
    } catch (error) {
        console.log(error);
    }
})

// DELETE CAR POST **

router.delete('/deletepost/:id', authMiddleware, async (req, res) => {

    try {
      await Car.deleteOne( { _id: req.params.id } );
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
});

// GET LOGOUT

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
  });

// POST LOGIN SIMPLE ADMIN **

// server.post('/admin', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     if(req.body.username === 'admin' && req.body.password === 'password') {
//       res.send('You are logged in.')
//     } else {
//       res.send('Wrong username or password');
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;