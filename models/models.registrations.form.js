const mongoose = require('mongoose')

const registrationFormSchema = new mongoose.Schema({
  eventName: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String
  },
  emailId: {
    type: String,
    required: true
  }
}, {timestamps: true})

const EventRegistration = mongoose.model('EventRegistration', registrationFormSchema)

module.exports = EventRegistration