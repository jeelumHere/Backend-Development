import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not defined in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not defined in environmental variables")
}
if(!process.env.PRIVATE_KEY){
    throw new Error("PRIVATE_KEY not defined in environmental variables")
}
if(!process.env.PUBLIC_KEY){
    throw new Error("PUBLIC_KEY not defined in environmental variables")
}
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID not defined in environmental variables")
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET not defined in environmental variables")
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN not defined in environmental variables")
}
if(!process.env.GOOGLE_USER){
    throw new Error("GOOGLE_USER not defined in environmental variables")
}
const config = {
    mongoString         : process.env.MONGO_URI,
    jwtSecret           : process.env.JWT_SECRET,
    privateKey          : process.env.PRIVATE_KEY,
    publicKey           : process.env.PUBLIC_KEY,
    googleClientId      : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret  : process.env.GOOGLE_CLIENT_SECRET,
    googleRefreshToken  : process.env.GOOGLE_REFRESH_TOKEN,
    googleUser          : process.env.GOOGLE_USER  
}

export default config

