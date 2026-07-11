import {Router} from "express"
import * as authControllers from "../controllers/auth.controllers.js"

const authRouter = Router()

authRouter.post("/register",authControllers.register)
authRouter.post("/login",authControllers.login)
authRouter.get("/logout",authControllers.logout)
authRouter.get("/refreshToken",authControllers.refreshToken)
authRouter.get("/logoutAll",authControllers.logoutAll)
authRouter.get("/verifyEmail",authControllers.verifyEmail)

export default authRouter
