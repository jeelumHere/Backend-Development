// It is used to declare api


import {Router} from "express"
import * as  authControllers from "../controllers/auth.controllers.js"

const authRouter = Router()

authRouter.post("/register",authControllers.register)

export default authRouter