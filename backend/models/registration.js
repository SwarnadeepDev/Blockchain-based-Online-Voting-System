const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  address: { type: String, required: true, immutable: true },
  id: { type: String, required: true, immutable: true },
  electionID: { type: String, required: true, immutable: true },
  approved: { type: Boolean, default: false }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

