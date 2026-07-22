import {Router} from "express"
import * as authController from "../controllers/auth.controller.js"
import * as userValidation from "../middleware/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register",userValidation.userRegistrationValidationRules,authController.register)
authRouter.post("/login",userValidation.userLoginValidationRules,authController.login)
authRouter.post("/refreshToken",authController.refreshToken)
authRouter.post("/logout",userValidation.verifyAccessToken,authController.logout)
authRouter.get("/getMe",userValidation.verifyAccessToken,authController.getMe)

export default authRouter