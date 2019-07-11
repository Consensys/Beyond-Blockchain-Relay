const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nonce: { type: Number, default: () => Math.floor(Math.random() * 1000000) },
  name: { type: String, required: true, unique: true, default: '' },
  description: { type: String, default: '' },
  organization: { type: Boolean, default: false }
});

module.exports = mongoose.model('user', UserSchema);