import express from "express"
import authRouter from "../src/routes/auth.routes.js"
import multer from "multer"
import morgan from "morgan"
import cookieParser from "cookie-parser"
const upload = multer({storage : multer.memoryStorage()})

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth",authRouter)

export default app
