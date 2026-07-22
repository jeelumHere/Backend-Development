import dotenv from "dotenv"

dotenv.config()

if(!(process.env.JWT_SECRET)){
    throw new Error("JWT_SECRET not present in environmental variables") 
}

if(!process.env.MONGO_STRING){
    throw new Error("MONGO_STRING not found in environmental variables")
}

const config = {
    jwtSecret : process.env.JWT_SECRET,
    mongoString : process.env.MONGO_STRING
}

export default config
