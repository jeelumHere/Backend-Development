import config from "../config/config.js"
import userModel from "../models/user.model.js"
import sessionModel from "../models/session.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export async function register(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "username or email already exists in database"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        })

        return res.status(200).json({
            message: "User registered successfully",
            User: user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}

export async function login(req, res) {
    try {
        let { username, email, password } = req.body

        username = username?.trim();
        email = email?.trim().toLowerCase();

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or username"
            })
        } 
        
        if (user.verified) {
            return res.status(401).json({
                message: "user already logged in"
            })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const refreshToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "7d" })
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10)
        const accessToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "15m" })
        user.verified = true;
        await user.save()


        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
        })

        const safeUser = user.toObject();
        delete safeUser.password


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).json({
            message: "Logged In Successfully",
            User: safeUser
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }

}

export async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "refreshtoken not found"
            })
        }
        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        const session = await sessionModel.findOne({
            user: decoded.id,
            revoked: false
        })

        if (!session) {
            return res.status(401).json({
                message: "session not found"
            })
        }
        const isValid = await bcrypt.compare(refreshToken, session.refreshTokenHash)
        if (!isValid) {
            return res.status(401).json({
                message: "session not found"
            })
        }

        session.revoked = true;
        session.save()
        user.verified = false
        user.save()

        res.clearCookie("refreshToken")

        return res.status(200).json({
            message: "LOgout successfull"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}
