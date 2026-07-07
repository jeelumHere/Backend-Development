// auth.router.js is  file to declare the api's we don't write api's logic or define api's in this file

import * as authController from "../controllers/auth.controllers.js"

import {Router} from "express"

const authRouter = Router()

/* POST => /api/auth/register 
  /api/auth => this prefix is declared in app.js file
 */

authRouter.post("/register", authController.register) 

export default authRouter;

