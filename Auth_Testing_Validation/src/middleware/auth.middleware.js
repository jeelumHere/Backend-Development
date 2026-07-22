import { body, validationResult } from "express-validator"

async function validateResult(req, res, next) {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }
    next()
}

const userRegistrationValidationRules = [
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 5, max: 20 })
        .withMessage("Length of the username must be 5 to 20 characters"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Length of Password must be atleast 6 characters"),

    validateResult
]

const userLoginValidationRules = [
    body("email") ?
        body("username")
            .isString()
            .withMessage("Username must be a string")
            .isLength({ min: 5, max: 20 })
            .withMessage("Length of the username must be 5 to 20 characters") :

        body("email")
            .isEmail()
            .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Length of Password must be atleast 6 characters"),

    validateResult
]
export { userRegistrationValidationRules, userLoginValidationRules }