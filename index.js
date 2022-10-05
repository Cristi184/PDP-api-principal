import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from './routes/auth.js'
import sectionsRoute from './routes/sections.js'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.js'
import cors from 'cors'
const PORT = process.env.PORT || 8800;

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconected', () => {
    console.log("mongoDB disconnected")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/sections", sectionsRoute)
app.use("/api/user", userRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(PORT, () => {
    connect()
    console.log("Connected to backend.")
})