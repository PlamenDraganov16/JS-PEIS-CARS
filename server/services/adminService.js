const User = require('./models/User');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mysecret'; // ideally in .env

async function register({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const user = await User.create({ username, password });

  const token = createToken(user);

  return token;
}

function createToken(user) {
  const payload = {
    _id: user._id,
    username: user.username
  };

  return jwt.sign(payload, SECRET, { expiresIn: '2d' });
}

module.exports = {
  register,
};