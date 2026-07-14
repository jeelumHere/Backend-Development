import * as musicController from "../controllers/music.controllers.js"

import {Router} from "express"

const musicRouter = Router()

musicRouter.post("/createMusic",musicController.createMusic)
musicRouter.post("/createAlbum",musicController.createAlbum)
musicRouter.get("/",musicController.getAllMusic)
musicRouter.get("/getAllAlbum",musicController.getAllAlbum)


export default musicRouter