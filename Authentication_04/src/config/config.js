import dotenv from "dotenv"

dotenv.config()


if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI does not exist in environmental variables")
}
if(!process.env.PRIVATE_KEY){
    throw new Error("PRIVATE_KEY does not exist in environmental variables")
}
if(!process.env.PUBLIC_KEY){
    throw new Error("PUBLIC_KEY does not exist in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET does not exist in environmental variables")
}
const config = {
    mongoString : process.env.MONGO_URI,
    privateKey :process.env.PRIVATE_KEY,
    publicKey : process.env.PUBLIC_KEY,
    jwtSecret : process.env.JWT_SECRET
}

export default config

