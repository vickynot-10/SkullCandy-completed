import { mongoose } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()


export async function getDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connect")
    } catch (e) {
        console.log(e)
    }
}