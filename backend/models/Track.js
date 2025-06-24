const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  spotifyEmbed: {
    type: String,
    default: ''
  },
  appleEmbed: {
    type: String,
    default: ''
  },
  songUrl: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Track', trackSchema);