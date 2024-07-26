import { user } from "../models/users.js";
import { generateToken } from "../utils/jwttokengenerate.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


export const startingPage = async(req, res) => {
    res.clearCookie("token")
    res.render('login');
}


export const homepage = (req, res) => {
    res.render("index")
}

export const register = async(req, res) => {
    const username = req.body.usernameRegister;
    let password = req.body.passwordRegister;
    let email = req.body.emailRegister;
    let salt = await bcrypt.genSalt()
    let hashedPassword = await bcrypt.hash(password, salt);
    const Uservar1 = await user.findOne({ username: username })
    const emailVar = await user.findOne({ email: email })
    console.log(Uservar1)
    console.log(emailVar)
    if (!Uservar1 && !emailVar) {
        try {
            const newUser = new user({
                username: username,
                email: email,
                password: hashedPassword
            })
            await newUser.save();
            console.log("Saved");
            return res.redirect('/home')
        } catch (e) {
            console.log(e)
        }

    }
    if (Uservar1) {
        return res.send("User with name already exists")
    }
    if (emailVar) {
        return res.send("User with mail already exists")
    }
}

export const login = async(req, res) => {
    let userVar;
    const usernameOrEmail = req.body.username_login;
    let password = req.body.password_login;
    const mailRegExp = /^[a-zA-Z][^\s@][a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$/
    const emailExp = mailRegExp.test(usernameOrEmail)
    console.log(emailExp)
    try {
        if (emailExp) {
            userVar = await user.findOne({ email: usernameOrEmail })
        } else {
            userVar = await user.findOne({ username: usernameOrEmail })
        }
        if (!userVar) {
            return res.status(401).send("Invalid username or email");
        }
        const passwordMatch = await bcrypt.compare(password, userVar.password)
        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }
        let token = generateToken(userVar)
        res.cookie("token", token, {
            httpOnly: true
        })

        return res.redirect('/home')
    } catch (e) {
        console.log(e)
    }
}

export const buynow = (req, res) => {
    let id = req.query.id
    console.log("id qeuery", id)
    res.render("buy_now", { id })
}

export const cartPage = (req, res) => {
    res.render("cartbag");
}