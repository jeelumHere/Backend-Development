import userModel from "../model/user.model.js"
import config from "../config/config.js"
import crypto from "crypto"
import uploadFile from "../services/storage.service.js"
import jwt from "jsonwebtoken"
import sessionModel from "../model/session.model.js"



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
                message: "Username or email already registered or exist in database"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        const userData = { username, email, password: hashedPassword }

        if (req.files && req.files.length > 0) {
            // 1. Map directly to the promises array without the redundant async wrapper
            const uploadPromises = req.files.map(ele => uploadFile(ele));

            // 2. Wait for all uploads to finish
            const result = await Promise.all(uploadPromises);

            // 3. FIX: Return an object containing both the url and fileId
            const imageData = result.map((ele) => {
                return {
                    url: ele.url,
                    fileId: ele.fileId
                };
            });

            // 4. Assign the structured array to your object
            userData.images = imageData;

            console.log("User Data After:", userData);
        }


        const user = await userModel.create(userData)
        
        const refreshToken = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: "7d"
        })

        const accessToken = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: "15m"
        })


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
        })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.create({
            userId : user._id,
            refreshTokenHash : refreshTokenHash,
            ip : req.ip,
            userAgent : req.headers[ 'user-agent' ]
        })



        res.status(201).json({
            message: "User Registered Successfully",
            User: user,
            accessToken
        })
    }

    catch (err) {
        res.status(500).json({
            message: "Server Failed",
            Error: err.message
        })
    }

}

export async function getMe(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        console.log('1...');

        if (!token) {
            return res.status({
                message: "Token does not exist"
            })
        }
        console.log('2...');

        const decoded = jwt.verify(token, config.jwtSecret)
        console.log('3...');
        console.log(decoded);

        const user = await userModel.findById(decoded.id)

        res.status(201).json({
            message: "User found",
            User: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server .....",
            Error: err.message
        })
    }

}

export async function refreshToken(req, res) {

    try {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken, config.jwtSecret)
        const newRefreshToken = jwt.sign({
            id: decoded.id
        }, config.jwtSecret, {
            expiresIn: "7d"
        })
        const accessToken = jwt.sign({
            id: decoded.id
        }, config.jwtSecret, {
            expiresIn: "7d"
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 100   // 7days 
        })

        res.status(201).json({
            message : "Token Refreshed Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Server error refreshToken",
            error : err.message
        })
    }
}

