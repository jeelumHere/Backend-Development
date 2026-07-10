import {Router} from "express"
import * as  authController from "../controllers/auth.controllers.js"


const authRouter = Router()

// POST =>  /api/auth/register

authRouter.post("/register",authController.register)
authRouter.post("/getMe",authController.getMe)
authRouter.get("/refreshToken",authController.refreshToken)
authRouter.get("/logout",authController.logout)

export default authRouter


