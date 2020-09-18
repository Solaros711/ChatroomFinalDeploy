const mongoose = require('mongoose')

const port = process.env.PORT
// const MESSAGES_PATH = './messages.txt'
const express = require('express')
const app = require('./app')()

const connectDatabase = async (hostname, databaseName) => {
    const database = await mongoose.connect(process.env.MONGODB_URI
      `mongodb://${hostname}/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
  
    console.log(`database connected successfully at mongodb://${hostname}/${databaseName} ...`)
    return database
  }

if(process.env.MODE_ENV === 'production'){
  app.use(express.static('client-react/build'))
}

app.listen(port, async () => {
    await connectDatabase('localhost', 'message-db')
    console.log(`server listening on port ${port}...`)
  })

console.log('server listening on port:', port)
