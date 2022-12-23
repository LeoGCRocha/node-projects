import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'

const API = '/api/v1/'

class App {
  constructor() {
    this.name = 'E-commerce Node Js API'
    this.server = express()

    dotenv.config()

    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log('DB Connection Successfull')
    }).catch((err) => {
      console.log(err)
    })

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(API, authRoutes)
    this.server.use(API, userRoutes)
  }
}

export default new App().server
