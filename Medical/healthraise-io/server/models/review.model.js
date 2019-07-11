const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  from: { type: String, required: true, unique: true },
  for: { type: String, required: true, unique: true },
  body: { type: String, default: '' },
  upvote: { type: Boolean, default: false },
  downvote: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 }
});

module.exports = mongoose.model('review', ReviewSchema);