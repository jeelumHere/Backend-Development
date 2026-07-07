import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found in environmental variables")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not found in environmental variables")
}

const config = {
    MONGO_STRING : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET
}

export default config;
