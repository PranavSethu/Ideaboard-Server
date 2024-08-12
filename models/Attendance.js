const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  guardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guard'
  },
  image: String,
  location: {
    lat: Number,
    long: Number
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
