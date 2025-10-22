require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const connectDB = require('./server/config/db');

const server = express();
connectDB();
server.set('view engine', 'ejs');
let PORT = process.env.PORT || 5000;


//for post requests
server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use('/cars', express.static('public/cars'));
server.use(morgan('dev'));
server.use(cookieParser());
server.use(methodOverride('_method'));
server.use('/', require('./server/routes/main'));
server.use('/', require('./server/routes/admin'));
//Saves the current URL path
server.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

server.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODBURI
  }),
}));

server.listen(PORT, () => {
    console.log('Server is running at: http://localhost:3000')
})