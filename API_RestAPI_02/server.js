// this is used to start the srver

const app = require("./src/app")  // instance required

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

const note = []

app.post("/note",(req,res)=>{
    console.log(req.body);
    note.push(req.body);

    res.status(201).json({
        message : "note created successfully"
    })
})