const {body, validationResult} = require("express-validator")



async function validateResult(req,res,next) {
    const error = validationResult(req)

    if(!(error.isEmpty())){
        return res.status(400).json({
            errors: error.array()
        })
    }

    next()
}


const userRegisterValidationRules = [
    body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({min:3,max:20})
    .withMessage("username must be between 3 and 20 letters"),

    body("email")
    .isEmail()
    .withMessage("Invalid email"),

    body("password")
    .isLength({min:6})
    .withMessage("Passwordlength should be least contain 6 characters"),

    validateResult

]

module.exports = {userRegisterValidationRules}