import express from "express"
import authRouter from "../src/routes/auth.routes.js"
import morgan from "morgan"
import multer from "multer"
import cookieParser from 'cookie-parser';
const upload = multer({storage : multer.memoryStorage()})



const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());

app.use("/api/auth", upload.single("image"),authRouter)
app.use("/api/auth",authRouter)

export default app;