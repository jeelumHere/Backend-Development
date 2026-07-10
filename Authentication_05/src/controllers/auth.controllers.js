import config from "../config/config.js"
import userModel from "../models/user.model.js"
import sessionModel from "../models/session.model.js"
import uploadFile from "../services/storage.services.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export async function register(req, res) {
    try {
        const { username, email, password } = req.body

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "username or email already registered"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const userData = { username, email, password: hashedPassword }

        if (req.files) {
            const uploadPromise = req.files.map(ele => uploadFile(ele));
            const result = await Promise.all(uploadPromise);

            const imagesData = result.map((ele) => {
                return {
                    url: ele.url,
                    fileId: ele.fileId
                }
            })
            userData.avatars = imagesData
        }

        const user = await userModel.create(userData)

        const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "7d" })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.create({
            userId: user._id,
            refreshTokenHash: refreshTokenHash,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "15m" })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })


        res.status(201).json({
            message: "User registered successfully",
            User: user
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
            root: "Register API"
        })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Email does not exist in database"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        if (hashedPassword !== user.password) {
            return res.status(401).json({
                message: "Invalid password or email"
            })
        }

        const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "7d" })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days 
        })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")


        const session = await sessionModel.create({
            userId: user._id,
            refreshTokenHash: refreshTokenHash,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "15m" })

        const safeUser = user.toObject()
        delete safeUser.password

        res.status(200).json({
            message: "Logged in successfully",
            User: safeUser
        })
    }
    catch (err) {
        res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
}

export async function refreshToken(req, res) {

    try {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked : false
        })

        if (!session) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }


        const newRefreshToken = jwt.sign({
            id: decoded.id
        }, config.jwtSecret, {
            expiresIn: "7d"
        })
        console.log(session);

        const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")
        session.refreshTokenHash = newRefreshTokenHash
        session.save()

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
            message: "Token Refreshed Successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server error refreshToken",
            error: err.message
        })
    }
}

export async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status({
                message: "Invalid refresh token"
            })
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        const user = await userModel.findById(decoded.id)

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })

        if (!session) {
            return res.status(401).json({
                message: "session not found"
            })
        }

        session.revoke = true

        session.save()
        res.clearCookie("refreshToken")
        res.status(200).json({
            message: "user logged out suucessfully",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
}

export async function logoutAll(req, res) {
    try {
        const refreshToken = req.cookie.refreshToken;

        if (!refreshToken) {
            return res.status({
                message: "Invalid refresh token"
            })
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        const user = await userModel.findById(decoded.id)

        await sessionModel.updateMany({
            refreshTokenHash,
            revoked: false
        }, {
            revoked: true
        })

        res.clearCookie("refreshToken")
        res.status(200).json({
            message: "user logged out fromm all devices suucessfully",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
}