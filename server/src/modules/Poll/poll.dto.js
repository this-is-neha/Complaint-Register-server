const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  HEALTHCARE: { type: Number, default: 0 },
  TRANSPORTATION: { type: Number, default: 0 },
  DRINKING_WATER: { type: Number, default: 0 },
  ROAD: { type: Number, default: 0 },
  EDUCATION: { type: Number, default: 0 },
  CRIMES: { type: Number, default: 0 },
  DOMESTIC_VIOLENCE_AND_CHILD_ABUSE: { type: Number, default: 0 }
});

module.exports = mongoose.model('Poll', PollSchema);