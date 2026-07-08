import {Router} from "express"
import * as authControllers from "../controllers/auth.controllers.js"

const authRouter = Router()

// POST =>  /api/auth/register

authRouter.post("/register",authControllers.register)


// POST =>  /api/auth/getMe

authRouter.post("/getMe",authControllers.getMe)

export default authRouter;