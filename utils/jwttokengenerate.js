import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()
export const generateToken = (user) => {
    try {
        return jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "10m" });
    } catch (e) {
        console.log(e)
    }
}