import { body, validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

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

// authMiddleware.js


const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer eyJhbGciOi..."
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // now the rest of your route knows who's making the request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token",error:err.message });
  }
};

export { userRegistrationValidationRules, userLoginValidationRules, verifyAccessToken }