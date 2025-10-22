const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
        res.redirect('/login');
        return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch(error) {
        res.redirect('/login')
        return;
    }
}

module.exports = authMiddleware;