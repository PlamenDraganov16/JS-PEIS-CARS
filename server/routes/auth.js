const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

require('dotenv').config();

// GET LOGIN PAGE **
router.get('/login', async (req, res) => {
    try {
        res.render('admin/login', { title: 'Login' });
    } catch (err) {
        console.log(err);
        res.status(404);
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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }); //for the cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
});

// POST REGISTER ADMIN **
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User Created', user });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ message: 'User already in use' });
        }
        res.status(500).json({ message: 'Internal server error' })
    }
});

// GET LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
});

module.exports = router;