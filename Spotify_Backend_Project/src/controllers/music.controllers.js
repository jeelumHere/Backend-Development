import sessionModel from "../models/session.model.js"
import userModel from "../models/user.model.js"
import musicModel from "../models/music.model.js"
import config from "../config/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function createMusic(req,res) {
    try {
        const refreshToken = res.cookie.refreshToken

        if (!refreshToken) {
            return status(401).json({
                error: 'refresh token not found '
            })
        }

        const decoded = json.verify(refreshToken, config.jwtSecret)
        if (!decoded) {
            return status(401).json({
                error: 'Unauthorized'
            })
        }

        const user = await userModel.findById(decoded.id)
        if (!user) {
            return status(401).json({
                error: 'Unauthorized'
            })
        }

        if (user.role !== "artist") {
            return status(401).json({
                error: 'Unauthorized'
            })
        }



        const session = await sessionModel.findOne({
            user: decoded.id,
            userAgent: req.headers["user-agent"],
            revoked: false
        })
        if (!session) {
            return status(401).json({
                error: 'session not found'
            })
        }

        const isValidToken = await bcrypt.compare(refreshToken, session.refreshTokenHash)
        if (!isValidToken) {
            return res.status(401).json({
                error: "refresh token is not valid"
            })
        }

        const { title, genre } = req.body
        
    }


    catch (error) {
        return status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}