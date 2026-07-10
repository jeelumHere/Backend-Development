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
            userId: user._id,
            refreshTokenHash: refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers['user-agent']
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

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        console.log(hashedPassword);
        console.log(user);
        
        

        if (hashedPassword !== user.password) {
            return res.status(401).json({
                message: "Invalid Password."
            })
        }

        const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "7d" })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "15m" })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days 
        })

        const session = await sessionModel.create({
            userId: user._id,
            refreshTokenHash: refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(200).json({
            message : "Log in successfully",
            User : safeUser
        })
    }

    catch(err){
        res.status(500).json({
            message : "Server error",
            Error : err.message,
            Root : "Login"
        })
    }

}

export async function getMe(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1]


        if (!token) {
            return res.status({
                message: "Token does not exist"
            })
        }

        const decoded = jwt.verify(token, config.jwtSecret)

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

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.findOne({
            refreshTokenHash,
            rovoked: false
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

        newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")
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
            return res.status(404).json({
                message: "Refresh token not found"
            })
        }

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })

        if (!session) {
            return res.status(404).json({
                message: "session not found"
            })
        }

        console.log(session);
        session.revoked = true;
        console.log(session.revoked);
        res.clearCookie("refreshToken")
        session.save()

        res.status(200).json({
            message: "Loged Out successfully"
        })

    }

    catch (err) {
        res.status(500).json({
            message: "Server Error",
            Error: err.message,
            root: "Loged Out API"
        })
    }
}

export async function logoutAll(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh Token Not found"
            })
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret)

        await sessionModel.updateMany({
            userId: decoded.id,
            revoked: false
        }, {
            revoked: true
        })

        res.clearCookie("refreshToken");

        res.status(200).json({
            messagee: "Loged Out from all devices successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            Error: err.message
        })
    }
}
