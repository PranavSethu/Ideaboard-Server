  const Guard = require('../models/Guard');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');

  exports.registerGuard = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Create a new guard instance. The password will be hashed automatically by the pre-save middleware defined in the schema.
      const newGuard = new Guard({
        name,
        email,
        password  // No need to hash here; the schema handles it.
      });
  
      // Save the new guard to the database.
      await newGuard.save();
  
      // Respond with success if the guard is registered without errors.
      res.status(201).send('Guard registered');
    } catch (error) {
      // If there's an error (e.g., duplicate email), send an appropriate error message.
      if (error.code === 11000) { // MongoDB duplicate key error code
        res.status(409).json({ message: 'Email already in use.' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.loginGuard = async (req, res) => {
    const { email, password } = req.body;
    try {
      const guard = await Guard.findOne({ email });
      if (!guard) {
        return res.status(404).json({ message: 'Guard not found' });
      }
  
      const isMatch = await guard.isValidPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: guard._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Logged in successfully',
        token,
        guardId: guard._id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.getGuards = async (req, res) => {
    try {
      const guards = await Guard.find({});
      res.status(200).json(guards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
