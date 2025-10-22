import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import authService from '../services/authService.js';
import getErrorMessage from '../utils/errorUtils.js';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'mysecret';

// GET LOGIN PAGE
router.get('/login', (req, res) => {
    try {
        res.render('admin/login', { title: 'Login' });
    } catch (err) {
        console.log(err);
        res.status(500).send(getErrorMessage(err));
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(401).render('admin/login', { error: 'Invalid credentials', user: req.body });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).render('admin/login', { error: 'Invalid credentials', user: req.body });

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).render('admin/login', { error: getErrorMessage(err), user: req.body });
    }
});

// POST REGISTER ADMIN
router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('admin/register', { error: errorMessage, user: userData });
    }
});

// GET LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

export default router;