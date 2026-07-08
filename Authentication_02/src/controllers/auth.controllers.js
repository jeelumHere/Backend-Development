// it is used to define api or we write api logic in this controller.js file

import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

/* Register User Function */
export async function register(req, res) {
    try {
        const { username, email, password } = req.body

        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "Username or Email already registered"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        },
            config.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(201).json({
            message: "User registered successfully",
            User: { username: user.username, email: user.email },
            token: token
        })

    }


    catch (err) {
        res.status(500).json({
            message: "server internal error",
            Error: err.message
        })
    }

}


/* getMe User function */

export async function getMe(req, res) {

    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Token Doesn't Exist"
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET)

        console.log(decoded)

        const user = await userModel.findById(decoded.id);


        res.status(200).json({
            message: "User Fetched Successfully",
            user: { username: user.username, email: user.email }
        })
    }
    catch(err){
        res.status(500).json({
            message  : "Server Error"
        })
    }



}


