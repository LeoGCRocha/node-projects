import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './routes/Router.js'
import './config/db.js'

require('dotenv').config()

const port = process.env.PORT
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(router)


// Upload direcotry
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})