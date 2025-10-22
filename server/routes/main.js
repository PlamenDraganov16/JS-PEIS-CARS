import express from 'express';
import Purchase from '../models/buy.js';
import getErrorMessage from '../utils/errorUtils.js';
import { getCars, getCarsById } from '../services/carService.js';

const router = express.Router();


// GET HOME **
router.get('/', (req, res) => { res.redirect('./home') });
router.get('/home', (req, res) => { res.render('index', { title: 'Welcome' }) });

// GET ABOUT **
router.get('/about', (req, res) => {
    res.render('about', { title: 'About us' });
});

// GET CATALOGUE **
router.get('/catalogue', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        const cars = await getCars(searchTerm);
        res.render('catalogue', { cars, title: "Our Cars" });
    } catch (err) {
        console.log(err);
        res.status(500).send(getErrorMessage(err));
    }
});

// GET CAR DETAILS **
router.get('/catalogue/:id', async (req, res) => {
  try {
    const { car, reviews } = await getCarsById(req.params.id);
    res.render('details', { car, reviews, title: 'Details' });
  } catch (err) {
    console.log(err);
    res.status(500).send(getErrorMessage(err));
  }
});

// GET LOGIN PAGE **

router.get('/login', async (req, res) => {
    try {
        res.render('admin/login', { title: 'Login' });
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

export default router;