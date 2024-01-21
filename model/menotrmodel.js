
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  mentorId: {
    type: String, 
    required: true,
    unique: true, 
  },
  mentorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [{
    type: String,
    ref: 'Project',
  }],
});

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = Mentor;

