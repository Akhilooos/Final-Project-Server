// models/submission.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  submissionId: {
    type: String,
    required: true,
    unique: true,
  },
  projectId: {
    type: String,
    ref: 'Project',
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  submissionFile: {
    type: String,
    required: true,
  },
  submissionStatus: {
    type: String,
    enum: ['Completed', 'Pending'],
    default: 'Pending',
  },
  marks: {
    type: Number,
  },
  comments: {
    type: String,
  },
  batch: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
