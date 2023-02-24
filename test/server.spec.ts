import server from '../src/server'
import request from 'supertest';
import connection from '../src/config/db.config'
const port = process.env.PORT;

var app: any
describe(`Express server is running on port ${process.env.PORT}`, () => {
    beforeAll(async () => {
        await connection.sync();
        app = server.listen(port);
    });
    
    it(`Should load welcome message on root`, async () => {
        const response = await request(server).get("/")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("Welcome to todo list backend 🤟")
    })

    it(`Should return 404 for non exist route`, async () => {
        const response = await request(server).get("/someroute")
        expect(response.status).toBe(404)
    })

    afterAll( done => {
        connection.close()
        app.close()
        done()
    })
})