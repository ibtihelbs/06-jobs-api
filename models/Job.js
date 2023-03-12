const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'please provide company name'],
    maxLength: 30
  },
  position: {
    type: String,
    required: [true, 'please provide position'],
    maxLength: 30
  },
  status: {
    type: String,
    enum: ['pending', 'approuved', 'interview'],
    default: 'pending',
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required: [true, 'please provide a user']
  }},
  {timestamps: true})

  module.exports = mongoose.model('jobsSchema', jobsSchema)