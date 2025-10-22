import express from 'express';
import Purchase from '../models/buy.js';
import Review from '../models/review.js';
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

// POST REVIEWS AND PURCHASE **
router.post('/catalogue/:id', async (req, res) => {
  try {
    const { formType } = req.body;

    if (formType === 'purchase') {
      const newPurchase = new Purchase(req.body);
      await newPurchase.save();
      return res.redirect('/catalogue');
    }

    if (formType === 'review') {
      const newReview = new Review(req.body);
      await newReview.save();
      return res.redirect('/catalogue');
    }

    res.status(400).send("Invalid form submission");
  } catch (err) {
    console.log(err);
    res.status(500).send(getErrorMessage(err));
  }
});

export default router;