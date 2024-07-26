import express from 'express';
import { startingPage, homepage, buynow, login, register, cartPage } from '../controllers/reqControllers.js'
import path from 'path';
import { verifyToken } from '../middlewares/index.js';
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const app = express();
const __dirname =
    import.meta.dirname;

const routes = express.Router();
app.use(cookieParser())


app.use(express.static(path.join(__dirname, "..", "src")))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "..", "views"))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes.get('/', startingPage)
routes.post('/register', register)
routes.post('/login', login)
routes.get('/home', verifyToken, homepage)
routes.get('/buynow', verifyToken, buynow)
routes.get('/cart', verifyToken, cartPage)

export default routes