// this file is used to start the server

const app = require('./src/app')

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    console.log("Mubharak je Server turr pya ne");
})

const notes = []

app.post('/note',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
})

// usingpostman forthe post 
/*
   const note = {
       title = "My First Note",
       description : "this is my first notes let's understand this"
   }

   const note = [
       {
          title : "This is first note in array 0",
          description : "Bring it on the note in the first array object 0"
       },
       {
          title : "This is first note in array 1",
          description : "Bring it on the note in the first array object 1"
       }
   ]

*/