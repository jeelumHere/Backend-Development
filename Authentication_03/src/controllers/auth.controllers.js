import crypto from "crypto"
import userModel from "../models/user.models.js"
import jwt from "jsonwebtoken"
import config from '../config/config.js'
import uploadFile from "../service/service.storage.js"
import { access } from "fs"



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

        const user = await userModel.create(userData)

        const accessToken = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: "15m"
        }
        )

        const refreshToken = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: "7d"
        }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })



        return res.status(201).json({
            message: "User Registered Successfully",
            user: { username: user.username, email: user.email, image: user.image },
            accessToken
        })

    }


    catch (err) {
        res.status(500).json({
            message: "Server error",
            Error: err.message
        })
    }
}



export async function getMe(req, res) {

    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Token Doesn't Exist"
            })
        }

        const decoded = jwt.verify(token, config.jwtSecret)

        console.log(decoded)

        const user = await userModel.findById(decoded.id);


        res.status(200).json({
            message: "User Fetched Successfully",
            user: { username: user.username, email: user.email, image: user.image }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }



}


export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken);

    if (!refreshToken) {
        res.status(401).json({
            message: "RefreshToken Not Found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.jwtSecret)

    const accessToken = jwt.sign({
        id: decoded.id
    }, config.jwtSecret, {
        expiresIn: "15m"
    })

    res.status(200).json({
        message : "Access Token Refreshed Successfully",
        accessToken
    })
}