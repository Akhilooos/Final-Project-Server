// models/project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

projectSchema.virtual('mentors', {
  ref: 'Mentor',
  localField: 'projectId',
  foreignField: 'projects',
  justOne: false,
});

projectSchema.virtual('submissions', {
    ref: 'Submission',
    localField: 'projectId',
    foreignField: 'projectId',
    justOne: false,
  });
  

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

