import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

export default function authMiddleware(req, res, next) {
  const token = req.cookies.auth; 

  if (!token) {
    return res.redirect('/auth/login'); 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id || decoded.userId;
    next();
  } catch (error) {
    return res.redirect('/auth/login');
  }
}