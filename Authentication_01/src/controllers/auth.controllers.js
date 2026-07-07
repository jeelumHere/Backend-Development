import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isAlreadyRegistered) {
            res.status(409).json({
                message: "Username or Emailalready exists in the database"
            })
        }
        // status 409 is used if there is a conflict

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        const user = await userModel.create({
            username,
            email,
            hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        }, config.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        res.status(201).json({
            message : "User created succesfully",
            User : {username : user.username, email : user.email}
        })
    }
    catch(err){
        res.status(404).json({
            message : "Server Error",
            Error : err.message
        })
    }

}