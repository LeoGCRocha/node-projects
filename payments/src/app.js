import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import CORS from 'cors'
import path from 'path'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import productRoutes from './routes/product'
import cartRoutes from './routes/cart'
import orderRoutes from './routes/order'
import stripeRoutes from './routes/stripe'

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
    this.server.use(CORS())
    this.server.set('view engine', 'ejs')
    this.server.set('views', path.resolve(__dirname, 'views'))
    this.server.use(express.static(`${__dirname}/views`))
    this.server.use(express.json())
  }

  routes() {
    this.server.use(API, authRoutes)
    this.server.use(API, userRoutes)
    this.server.use(API, productRoutes)
    this.server.use(API, cartRoutes)
    this.server.use(API, orderRoutes)
    this.server.use(API, stripeRoutes)
  }
}

export default new App().server
