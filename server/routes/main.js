const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Car = require('../models/car');
const Purchase = require('../models/buy');


// GET HOME **

router.get('/', (req, res) => {
    res.redirect('./home');
})

// GET HOME **

router.get('/home', (req, res) => {
    res.render('index', {title: 'Welcome'});
})

// GET ABOUT **

router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

// GET CATALOGUE **

router.get('/catalogue', async (req, res) => {
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

// GET CAR DETAILS **

router.get('/catalogue/:id', (req, res) => {
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

// GET LOGIN PAGE **

router.get('/login', async (req, res) => {
    try {
    res.render('admin/login', {title: 'Login'});
    } catch (err) {
        console.log(err);
        res.status(404);
    }
  });

// POST REVIEWS AND PURCHASE **

router.post('/catalogue/:id', (req, res) => {
  
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

module.exports = router;