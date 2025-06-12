// models/Assignment.js
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  assignmentId: {
    type: String,
    required: true,
    unique: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  engineerId: {
    type: Number,
    required: true,
  },
  engineerName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Planning',
  },
  allocatedHours: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  tasks: [String],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
