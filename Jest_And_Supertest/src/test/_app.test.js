const request = require("supertest")

const app = require("../app")

describe("POST /user",()=>{

    it("should return 400 when email is missing",async()=>{

        const res = await request(app).post("/user").send({email:"test@test.com"})

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message : "Name not found"})
    })

    it("should return 400 when name is missing", async()=>{

        const res = await request(app).post("/user").send(({name : "Sharjil"}))

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message : "Email not found"})
    })

    it("should return 201 when name and email are found", async ()=>{
        const res = await request(app).post("/user").send({email: 'test@test.com', name :"sharjeel"})

        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({message : "User created"})
    })

})

describe("GET /peroduct/:id",()=>{
    it("should return 400 if id is not a number", async()=>{

        const res = await request(app).get("/product/abc")
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message:"Invalid id"}) 
    })

    it("should return 404 if id is not from 1 to 100", async()=>{

        const res = await request(app).get("/product/1256")
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({message:"Product not found"}) 
    })

    it("should return 200 if id is found", async()=>{

        const res = await request(app).get("/product/55")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message:"Product found", id: "55", product : "Product 55"}) 
    })
})

describe("GET /product?category=electronics", ()=>{
    it("should return 400 if category is not provided", async()=>{
        const res = await request(app).get("/product")

        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({message : "Category is required"})
    })

    it("should return 200 if category is provided", async()=>{
        const res = await request(app).get("/product?category=electronics")

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({category : "electronics"})
    })
})