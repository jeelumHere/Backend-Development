// starts the server

const app = require("./src/app")
const connectDB = require("./src/db/db")

connectDB()


app.listen(3000,()=>{
    console.log("Sever is running on port 30000")
})
