const express = require("express")

const app = express()

app.use(express.json())


app.post("/user",(req,res)=>{
    const {email,name} = req.body


    if(!email){
        return res.status(400).json({
            message: 'Email not found'
        })
    }


    if(!name){
        return res.status(400).json({
            message: 'Name not found'
        })
    }


    return res.status(201).json({
        message : "User created"
    })

})

app.get("/product/:id",(req,res)=>{
    const id = req.params.id

    // const isNumber = isInteger(Number(id))
    if(!Number.isInteger(Number(req.params.id))){
        return res.status(400).json({
            message: 'Invalid id'
        })
    }

    if(Number(id)>100 || Number(id)<1){
        return res.status(404).json({
            message : 'Product not found'
        })
    }

    return res.status(200).json({
        message : "Product found",
        id : id,
        product : "Product " + id
    })
})

app.get("/product",(req,res)=>{

    if(!(req.query.category)){
        return res.status(400).json({
            message : "Category is required"
        })
    } 

    return res.status(200).json({
        category : req.query.category,
    })
})

module.exports = app
