const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');  // If you want to explicitly use body-parser instead of express.json()
const app = express();
const PORT = process.env.PORT || 3002;

// Setup CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this if your front-end origin changes
    credentials: true  // To allow session cookies from the browser to pass through
}));

// Handle JSON and URL-encoded data as well as increase the body size limit
// Notice the order: CORS first, then body parsers
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Routes
const GuardRouter = require("../Server/routes/guardroutes");
const AttendanceRouter = require("../Server/routes/attendanceroutes");

app.use("/api/v1/guard", GuardRouter);
app.use("/api/v1/attendance", AttendanceRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

module.exports = app;
