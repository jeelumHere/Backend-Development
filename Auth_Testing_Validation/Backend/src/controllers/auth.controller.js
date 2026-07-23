import config from "../config/config.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import crypto from "crypto"
import userModel from "../model/user.model.js"
import sessionModel from "../model/session.model.js"
import cookieParser from "cookie-parser"



export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // Use findOne instead of find
        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        // if null, this block is skipped correctly
        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: 'User already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Added salt rounds factor

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            User: user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message // Fixed typo here
        });
    }
}

export async function login(req, res) {
    try {
        const { username, email, password } = req.body;

        let user;
        if (username) {
            user = await userModel.findOne({ username });
        } else if (email) {
            user = await userModel.findOne({ email });
        } else {
            return res.status(400).json({ message: "Invalid username or email" });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid username or email" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "7d" });
        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "15m" });
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false locally, true in prod
            sameSite: "Lax", // "Strict" can still cause edge-case issues too, Lax is safer for now
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await sessionModel.findOneAndUpdate(
            { user: user._id, userAgent: req.headers["user-agent"] },
            {
                refreshTokenHash,
                ipAddress: req.ip,
                userAgent: req.headers["user-agent"],
                lastUsedAt: new Date()
            },
            { upsert: true, new: true }
        );

        const safeUser = user.toObject();
        delete safeUser.password;

        return res.status(200).json({
            message: "User logged in successfully",
            user: safeUser,
            accessToken
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                message: "refresh token not found"
            })
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret)
        if (!decoded) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const session = await sessionModel.findOneAndDelete(
            { user: decoded.id }, { refreshTokenHash }, { userAgent: req.headers["user-agent"] }
        )
        if (!session) {
            return res.status(400).json({
                message: "Session not found"
            })
        }

        res.clearCookie("refreshToken", refreshToken)

        session.save()
        return res.status(201).json({
            message: "Logout successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
}

export async function getMe(req, res) {

    try {
        const accessToken = req.headers.authorization?.split(" ")[1]

        if (!accessToken) {
            return res.status(401).json({
                message: "accessToken not found"
            })
        }

        const decoded = jwt.verify(accessToken, config.jwtSecret)
        if (!decoded) {
            return res.status(401).json({
                message: "accessToken not verified"
            })
        }


        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }


        res.status(200).json({
            message: "User Fetched Successfully",
            user: { username: user.username, email: user.email }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
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
            revoked: false
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

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false locally, true in prod
            sameSite: "Lax", // "Strict" can still cause edge-case issues too, Lax is safer for now
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "Token Refreshed Successfully",
            accessToken
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server error refreshToken",
            error: err.message,
        })
    }
}