const express = require('express');
const Attendancerouter = express.Router();
const { markAttendance, getAttendance } = require('../controller/attendanceController');
const authenticateToken = require('../middleware/authmiddleware');

Attendancerouter.post('/mark', authenticateToken, markAttendance);
Attendancerouter.get('/report', authenticateToken, getAttendance);

module.exports = Attendancerouter;

