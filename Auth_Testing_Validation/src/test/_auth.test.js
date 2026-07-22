import request from "supertest";
import app from "../app.js";
import config from "../config/config.js"
import mongoose from "mongoose"; // Replace with your actual database client (pg, sequelize, etc.)

// Group related tests
describe("POST /register", () => {
    
    // Clear or connect before tests begin
    beforeAll(async () => {
        // Optional: Ensure database is connected if app.js doesn't do it automatically
        await mongoose.connect(config.mongoString); 
    });

    // Disconnect and clean up resources after all tests in this file complete
    afterAll(async () => {
        await mongoose.disconnect(); // Closes the database connection pool safely
        // If your app.js starts an active server instance via app.listen(), close it here as well
    });

    it("should return 400 if invalid info is provided", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({ username: 12345, email: "test", password: 12345 });

        expect(res.statusCode).toBe(400);
    });

    it("should return 201 when resource is created", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({ username: "ssa12345", email: "test@test.com", password: "12345789" });

        // Validating the response ensures the promise completes and verifies the outcome
        expect(res.statusCode).toBe(201); 
    });
});
