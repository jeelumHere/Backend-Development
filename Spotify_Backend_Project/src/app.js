import express from "express"
import authRouter from "../src/routes/auth.routes.js"
import musicRouter from "../src/routes/music.routes.js"
import multer from "multer"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import * as authMiddleware from "./middlewares/auth.middleware.js"
const upload = multer({storage : multer.memoryStorage()})

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/music",authMiddleware.authArtist,upload.single("music"),musicRouter)

export default app
