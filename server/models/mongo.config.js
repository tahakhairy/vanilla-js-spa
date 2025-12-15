const mongoose = require('mongoose')
const mongodbUrl = 'mongodb://127.0.0.1:27017/'

if (!mongodbUrl) {
  console.log('\x1b[33m%s\x1b[0m', 'Please set the mongodb connection first!\n')
  // You might want to throw an error or exit the process here if the connection string is mandatory
  process.exit(1)
}

// Use the modern connect method with recommended options
mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log('Connected to Database Video Requests successfully!')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
  })

// If you still need the 'db' object for event listeners, you can keep them:
const db = mongoose.connection

// While you can still use event listeners, the .then/.catch block above is usually sufficient for initial connection status.
// These are useful for handling disconnections *after* the initial connection is made.
db.on('error', (err) => {
  console.error.bind(console, 'connection error:')
  // Handle error events that might occur after a successful initial connection
})

// Export mongoose to be used in other parts of your Express application (e.g., in model definitions)
module.exports = mongoose
