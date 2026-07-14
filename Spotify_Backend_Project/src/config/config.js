import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGO_STRING){
    throw new Error("MONGO_STRING not present in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not present in environmental variables")
}
if(!process.env.PRIVATE_KEY){
    throw new Error("PRIVATE_KEY not present in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not present in environmental variables")
}

const config = {
    mongoString : process.env.MONGO_STRING,
    jwtSecret   : process.env.JWT_SECRET,
    privateKey  : process.env.PRIVATE_KEY,
    publicKey   : process.env.PUBLIC_KEY
}

export default config