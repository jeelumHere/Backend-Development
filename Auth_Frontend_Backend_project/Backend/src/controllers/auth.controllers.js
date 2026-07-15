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


        const session = await sessionModel.findOneAndUpdate(
            { user: user._id, userAgent: req.headers["user-agent"] },
            {
                refreshTokenHash,
                ipAddress: req.ip,
                userAgent: req.headers["user-agent"],
                revoked: false
            },
            { upsert: true, new: true }
        )

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
            User: safeUser,
            accessToken
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
        const user = await userModel.findById(decoded.id)

        const session = await sessionModel.findOne({
            user: decoded.id,
            userAgent: req.headers["user-agent"],
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
        await session.save()

        res.clearCookie("refreshToken")

        return res.status(200).json({
            message: "Logout successfull"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}

export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found"
            })
        }
        const decoded = jwt.verify(refreshToken, config.jwtSecret)
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({
                message: "Invaid credentials"
            })
        }

        const session = await sessionModel.findOne({
            user: user._id,
            userAgent: req.headers["user-agent"],
            revoked: false
        })

        if (!session) {
            return res.status(401).json({
                message: "Invaid credentials"
            })
        }


        const isValidSession = await bcrypt.compare(refreshToken, session.refreshTokenHash)

        if (!isValidSession) {
            return res.status(401).json({
                message: "Session not found"
            })
        }




        const newRefreshToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "7d" })
        const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10)

        const accessToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: "15m" })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        session.refreshTokenHash = newRefreshTokenHash
        await session.save()

        return res.status(200).json({
            message: "Token Refreshed",
            accessToken
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }


}

export async function logoutAll(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(201).json({
                message: "Refresh token not found"
            })
        }
        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        await sessionModel.deleteMany({ user: decoded.id })
        const user = await userModel.findById(decoded.id)

        res.clearCookie("refreshToken")
        return res.status(200).json({
            message : "Log out fromm all devices",
            User : user
        })
    }
    catch(err){
        return res.status(500).json({
            messag : "Server error",
            error : err.message
        })
    }
}
