import express from "express"
import morgan from "morgan"
import multer from "multer"
import cookieParser from "cookie-parser"
const upload = multer({storage : multer.memoryStorage()})


import authRouter from "../src/routes/auth.route.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",upload.array("images",3),authRouter)
app.use("/api/auth",authRouter)



export default app;

