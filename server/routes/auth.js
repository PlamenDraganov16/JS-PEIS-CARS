import express from 'express';
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

// POST LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin/dashboard'); 
  } catch (err) {
    res.status(401).render('admin/login', { error: err.message, user: req.body });
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
        res.status(400).render('admin/login', { error: errorMessage, user: userData, title: 'Login Page' });
    }
});

// GET LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('auth'); 
    res.redirect('/');
});

export default router;