import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not found in environmental variables")
}
if(!process.env.PRIVATE_KEY){
    throw new Error("PRIVATE or PUBLIC KEY not found in environmental variables")
}


const config = {
    mongoString : process.env.MONGO_URI,
    jwtSecret : process.env.JWT_SECRET,
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY
}


export default config;