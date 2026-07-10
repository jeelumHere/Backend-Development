import express from "express"
import morgan from "morgan"
import multer from "multer"
import cookieParser from "cookie-parser"

const upload = multer({storage :multer.memoryStorage()})
import authRouter from "./routes/auth.routes.js"

const app = express()

app.use(express.json()) 
app.use(morgan("dev"))
app.use(cookieParser())

// POST =>  /api/auth/register
app.use("/api/auth",upload.array("images",3),authRouter)


export default app;
