const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  farmerName: { type: String },
  email: { type: String },
  farmLocation: { type: String },
  farmerNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Farmer', farmerSchema);
