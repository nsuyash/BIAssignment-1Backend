const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  price: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true
  },
  speakers: [{
    name: {
      type: String,
      reauired: true
    },
    image: {
      type: String,
      reauired: true
    },
    organization: {
      type: String,
      reauired: true
    },
    department: {
      type: String,
      reauired: true
    },
  }],
  coverImageUrl: {
    type: String,
    required: true
  },
  dressCode: {
    type: String
  },
  ageRestriction: {
    type: String
  },
  tag: {
    type: String,
    required: true,
    enum: [
        "Technology",
        "Music",
        "Art",
        "Business",
        "Food",
        "Health",
        "Startup",
        "Film",
        "Photography",
        "Fashion",
        "Books",
        "Science",
        "Comedy",
        "Charity",
        "Gaming",
        "Environment",
        "Robotics",
        "Fitness",
        "Wine",
        "History",
        "Other"
      ]
  }
}, {timestamps: true})

const Events = mongoose.model('Events', eventSchema)

module.exports = Events