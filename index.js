const {initializeDatabase} = require('./db/db.connect')
const Events = require('./models/models.events')
const EventRegistration = require('./models/models.registrations.form')
const express = require('express')
const app = express()
const cors = require('cors')
const corsOption = {
  origin: "*",
  credentials: true
}

initializeDatabase()

app.use(express.json())
app.use(cors(corsOption))

// To get all data route: /events
async function getAllEvents(){
  try {
    const events = await Events.find()
    return events
  } catch (error) {
    throw error
  }
}

app.get('/events', async (req, res) => {
  try {
    const events = await getAllEvents()
    if(events){
      res.status(201).json(events)
    } else {
      res.status(404).json({error: "No event found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch events."})
  }
})

// To add data, route: apiUrl/events
async function seedData(eventData){
  try{
      const event = new Events(eventData)
      const saved = await event.save()
    return saved
  } catch (error) {
    throw error
  }
}

app.post('/events', async (req, res) => {
  try {
    const savedEvents = await seedData(req.body)
    if(savedEvents){
      res.status(201).json({message: "Event added successfully.", data: savedEvents})
    } else {
      res.status(404).json({error: "No event added."})
    }
  } catch (error) {
    res.status(500).json({error: `Failed to add events: ${error}`})
  }
})

// To add multiple data at a time route: apiUrl/events/sets
async function seedMultipleData(eventsData){
  try{
    const newData = []
    for(let eventData of eventsData){
      const event = new Events(eventData)
      const saved = await event.save()
      newData.push(saved)
    }
    return newData
  } catch (error) {
    throw error
  }
}

app.post('/events/sets', async (req, res) => {
  try {
    const savedEvents = await seedMultipleData(req.body)
    if(savedEvents){
      res.status(201).json({message: "Event added successfully.", data: savedEvents})
    } else {
      res.status(404).json({error: "No event added."})
    }
  } catch (error) {
    res.status(500).json({error: `Failed to add events: ${error}`})
  }
})

// get event by id

async function getEventById(eventId){
  try {
    const event = await Events.findById(eventId)
    return event
  } catch (error) {
    throw error
  }
}


app.get('/events/:eventId', async (req, res) => {
  try {
    const event = await getEventById(req.params.eventId)

    if(event){
      res.status(201).json(event)
    } else {
      res.status(404).json({error: "No event found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch event."})
  }
})

// Route for event registration
async function createUserRegistration(userDetails){
  try {
    const registerUser = new EventRegistration(userDetails)
    const saved = await registerUser.save()
    return saved
  } catch (error) {
    throw error
  }
}

app.post('/events/registration', async (req, res) => {
  try {
    const registeredUser = await createUserRegistration(req.body)
    if(registeredUser){
      res.status(201).json({message: "Event registration successful.", user: registeredUser})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to add event."})
  }
})
 
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})