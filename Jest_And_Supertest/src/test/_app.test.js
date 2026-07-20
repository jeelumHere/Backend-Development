// jest     =>   It is a package which is used to test the code of javascript

// supertest    =>  It is a package needed for package jest so that it can test express() code of javascript

const request = require("supertest")

const app = require("../app")

describe("GET /", ()=>{
    it("should return 200 ok", async ()=>{

        const res = await request(app).get("/")

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message : "Hello World!!"})
    })
})


