import jwt from "jsonwebtoken";
import { user } from "../models/users.js";

export const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Token is missing")
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decode) => {
            if (err) {
                return res.status(402).send("Error at token")
            }
            const user1 = await user.findOne({ _id: decode.id })
            if (!user1) {
                return res.status(403).send("user not find");
            }
            req.user = user1;
            console.log(req.user)
            next()
        })
    } catch (e) {
        res.clearCookie("token");
        res.redirect('/');
    }
}