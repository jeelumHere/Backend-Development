import userModel from "../src/models/user.model.js"
import crypto from "crypto"

async function register(req,res){
    const {username, email, password} = req.body;

    const isAlreadyRegistered = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
    })

    if(isAlreadyRegistered){
        res.status(409).json({
            message  : "Username or Emailalready exists in the database"
        })
    }
    // status 409 is used if there is a conflict

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        hashedPassword
    })

}