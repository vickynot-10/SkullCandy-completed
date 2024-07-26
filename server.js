import express from 'express';
const app = express();
import path from 'path';
import routes from "./routes/main.js"
import { configDotenv } from 'dotenv';

import cookieParser from "cookie-parser";
import { getDatabase } from './database/db.js';
getDatabase()

configDotenv()


const __dirname =
    import.meta.dirname;
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "src")))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
const port = process.env.PORT_NUMBER || 1010
console.log(process.env.PORT_NUMBER)
app.listen(port)