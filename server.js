import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import connectDB from './server/config/db.js';
import mainRoutes from './server/routes/main.js';
import adminRoutes from './server/routes/admin.js';
import authRoutes from './server/routes/auth.js';

const server = express();
connectDB();

server.set('view engine', 'ejs');
const PORT = process.env.PORT || 5000;

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(morgan('dev'));
server.use(cookieParser());
server.use(methodOverride('_method'));

// Routes
server.use('/', mainRoutes);
server.use('/', adminRoutes);
server.use('/', authRoutes);

// Save current URL path
server.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Session
server.use(
  session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODBURI
    })
  })
);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});