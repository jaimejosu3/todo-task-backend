import server from '../../../src/server'
import request from 'supertest';
import connection from '../../../src/config/db.config'

const port = process.env.PORT;

let app: any

let dummyTask: any = {
    title: "task title",
    description: "task description",
    status: "todo"
}

describe(`Should perform Post for tasks`, () => {
    beforeAll(async () => {
        app = server.listen(port);
        await connection.sync();
    });
    
    it(`Create new task with empty body, should return 400 bad request`, async () => {
        const response = await request(server).post("/tasks").send({})
        expect(response.status).toBe(400)
    })

    it(`Create new task with invalid body, should return 400 bad request`, async () => {
        const response = await request(server).post("/tasks").send({other: "value"})
        expect(response.status).toBe(400)
    })
    
    it(`Create new task with full data, should return 200 with new task data`, async () => {
        const response = await request(server).post("/tasks").send(dummyTask)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body).toHaveProperty("data")
        expect(response.body.meta).toHaveProperty("message")
        expect(response.body.data).toHaveProperty("id")
        expect(response.body.data).toHaveProperty("title",dummyTask.title)
        expect(response.body.data).toHaveProperty("description",dummyTask.description)
        expect(response.body.data).toHaveProperty("status",dummyTask.status)
        dummyTask.id = response.body.data.id
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