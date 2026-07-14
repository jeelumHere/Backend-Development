import * as musicController from "../controllers/music.controllers.js"

import {Router} from "express"

const musicRouter = Router()

musicRouter.post("/createMusic",musicController.createMusic)