import { Router } from "express";
import * as authController from "../controllers/auth.controllers.js"

const authRouter = Router()

authRouter.post("/register",authController.register)
authRouter.get("/login",authController.login)
authRouter.get("/logout",authController.logout)

export default authRouter