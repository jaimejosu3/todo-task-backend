import server from '../../../src/server'
import request from 'supertest';
import connection from '../../../src/config/db.config'

const port = process.env.PORT;

let app: any
let existingTask: any

let dummyTask: any = {
    title: "task title",
    description: "task description",
    status: "pending"
}

describe(`Should perform Get for tasks`, () => {
    beforeAll(async () => {
        app = server.listen(port);
        await connection.sync();
        let response = await request(server).post("/tasks").send(dummyTask)
        dummyTask.id = response.body.data.id
    });    

    it(`Get a list of pending tasks`, async () => {
        const response = await request(server).get("/tasks/query?status=pending")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body).toHaveProperty("data")
        expect(response.body.meta).toHaveProperty("message")
        expect(response.body.data.length).toBeGreaterThan(0)
    })

    it(`Get a list of all tasks, return data and status 200`, async () => {
        const response = await request(server).get("/tasks")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body).toHaveProperty("data")
        expect(response.body.meta).toHaveProperty("message")
        expect(response.body.data.length).toBeGreaterThan(0)
    })

    it(`Get an existing task with id, return data and status 200`, async () => {
        const response = await request(server).get(`/tasks/${dummyTask.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body).toHaveProperty("data")
        expect(response.body.meta).toHaveProperty("message")
        expect(response.body.data).toHaveProperty("id")
        expect(response.body.data).toHaveProperty("title")
        expect(response.body.data).toHaveProperty("description")
        expect(response.body.data).toHaveProperty("status")
        expect(response.body.data.id).toBe(dummyTask.id)
    })

    it(`Get a non existing task with id, return meta with 404`, async () => {
        const response = await request(server).get(`/tasks/${800}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("meta")
        expect(response.body.meta).toHaveProperty("code")
        expect(response.body.meta.code).toBe(404)
    })

    it(`Get a non existing task with wrong id, return 400 with error`, async () => {
        const response = await request(server).get(`/tasks/sometext`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("meta")
        expect(response.body.meta).toHaveProperty("code")
        expect(response.body.meta.code).toBe(400)
    })

    afterAll( done => {
        (async () => {
            await request(server).delete("/tasks/" + dummyTask.id)
            await connection.close()
            app.close()
            done()
        })()
    })
})