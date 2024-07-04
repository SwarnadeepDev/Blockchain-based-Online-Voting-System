const mongoose = require('mongoose');

const candidateRegistrationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  id: { type: String, required: true },
  electionID: { type: String, required: true },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('CandidateRegistration', candidateRegistrationSchema);
