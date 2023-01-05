import { mongoose } from "mongoose"

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

// connection
const conn = async () => {
    try {
        mongoose.set('strictQuery', false)
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ywpjtiq.mongodb.net/?retryWrites=true&w=majority`
        )

        return dbConn
    } catch (error) {
        console.log(error)
    }
}

conn()

export default conn