import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import Car from '../models/car.js';
import Purchase from '../models/buy.js';
import Review from '../models/review.js';
import User from '../models/user.js';
import getErrorMessage from '../utils/errorUtils.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const upload = multer({ storage });

// GET NEW CAR **

router.get('/addcar', authMiddleware, (req, res) => {
    res.render('addcar', { title: 'Add new car' });
})

// GET DASHBOARD **

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        let reviews = await Review.find().sort({ createdAt: -1 });
        try {
            let purchases = await Purchase.find().sort({ createdAt: -1 });
            res.render('admin/dashboard', { reviews, purchases, title: "Dashboard" });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error Fetching Purchases');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error Fetching Reviews');
    }
});

// GET CAR LIST **

router.get('/carposts', authMiddleware, async (req, res) => {
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

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret); //for the cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
})

// POST REGISTER ADMIN **

router.post('/register', async (req, res) => {
  const userData = req.body;

  try {
    const token = await adminService.register(userData);
    res.cookie('auth', token);
    res.redirect('/');
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    res.status(400).render('admin/register', { error: errorMessage, user: userData });
  }
});

// DELETE CAR POST **

router.delete('/deletepost/:id', authMiddleware, async (req, res) => {
    try {
        await Car.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

// GET LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

export default router;