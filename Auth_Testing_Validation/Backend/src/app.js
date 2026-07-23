import express  from "express"
import multer from "multer"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"

const upload = multer({storage:multer.memoryStorage()})
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: 'http://localhost:5173' ,
    credentials: true,
}))
app.use("/api/auth",upload.none(),authRouter)
app.use("/api/auth",authRouter)

export default app