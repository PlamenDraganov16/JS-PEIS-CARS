const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [/^[a-zA-Z0-9]+$/],
    minLength: [6, 'Password should be at least 6 characters'],
  },

});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 13);
});

module.exports = mongoose.model('User', userSchema, 'users');