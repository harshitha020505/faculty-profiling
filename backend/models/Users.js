// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginType: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
  // Hash the password before saving the user
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add method to compare password during login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
