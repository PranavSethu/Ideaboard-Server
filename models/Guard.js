const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const guardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'guard'  // Assuming 'guard' as default role
  },
  lastLogin: {
    type: Date
  }
});

// Pre-save hook to hash password before saving it to the database
guardSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check the entered password against the hashed one in the database
guardSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Guard', guardSchema);
