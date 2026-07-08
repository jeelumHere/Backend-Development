import crypto from "crypto"
import userModel from "../models/user.models.js"
import jwt from "jsonwebtoken"
import config from '../config/config.js'
import uploadFile from "../service/service.storage.js"



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

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const userData = { username, email, password: hashedPassword }

        if (req.file) {
            const result = await uploadFile(req.file)
            console.log("uploadFile result:", result)
            userData.image = result.url
        }

        console.log("Userdata before create :", userData)
        const user = await userModel.create(userData)
        console.log('use after create : ',user);

        const token = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: "1h"
        }

        )



        return res.status(201).json({
            message: "User Registered Successfully",
            user: { username: user.username, email: user.email, image: user.image },
            token: token
        })

    }


    catch (err) {
        res.status(500).json({
            message: "Server error",
            Error: err.message
        })
    }
}