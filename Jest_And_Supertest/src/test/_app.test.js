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