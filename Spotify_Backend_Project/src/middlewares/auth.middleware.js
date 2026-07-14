import sessionModel from "../models/session.model.js"
import userModel from "../models/user.model.js"
import musicModel from "../models/music.model.js"
import uploadFile from "../services/storage.service.js"
import config from "../config/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export async function authArtist(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                error: 'refresh token not found '
            })
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret)
        if (!decoded) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        if (user.role !== "artist") {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }



        const session = await sessionModel.findOne({
            user: decoded.id,
            userAgent: req.headers["user-agent"],
            revoked: false
        })
        console.log(session);
        if (!session) {
            return res.status(401).json({
                error: 'session not found'
            })
        }

        const isValidToken = await bcrypt.compare(refreshToken, session.refreshTokenHash)
        if (!isValidToken) {
            return res.status(401).json({
                error: "refresh token is not valid"
            })
        }

        req.user = user

        next()
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }

}

export async function authUser(req,res,next){
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                error: 'refresh token not found '
            })
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret)
        if (!decoded) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        if (user.role !== "artist" && user.role !=="user") {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }



        const session = await sessionModel.findOne({
            user: decoded.id,
            userAgent: req.headers["user-agent"],
            revoked: false
        })
        console.log(session);
        if (!session) {
            return res.status(401).json({
                error: 'session not found'
            })
        }

        const isValidToken = await bcrypt.compare(refreshToken, session.refreshTokenHash)
        if (!isValidToken) {
            return res.status(401).json({
                error: "refresh token is not valid"
            })
        }

        req.user = user

        next()
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal Server Error',
            error : err.message
        })
    }
}