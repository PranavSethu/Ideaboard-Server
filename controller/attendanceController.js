const Attendance = require('../models/Attendance');

// Assuming "image" is a base64 encoded string and "location" is an object { lat, long }
const markAttendance = async (req, res) => {
  const { image, location } = req.body;

  try {
    const newAttendance = new Attendance({
      guardId: req.guardId,  // This needs to be set after authentication
      image: image,
      location: location,
      timestamp: new Date()
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked', attendanceId: newAttendance._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAttendance = async (req, res) => {
  const { date } = req.query; // Expecting a date in the format "YYYY-MM-DD"
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const attendances = await Attendance.find({
      timestamp: { $gte: startOfDay, $lte: endOfDay }
    }).populate('guardId', 'name');

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {markAttendance,getAttendance};

