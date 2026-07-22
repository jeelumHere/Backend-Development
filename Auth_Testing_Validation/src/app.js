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
app.use(cors())
app.use("/api/auth",upload.none(),authRouter)

export default app