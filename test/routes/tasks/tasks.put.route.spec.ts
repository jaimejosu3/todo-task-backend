import server from '../../../src/server'
import request from 'supertest';
import connection from '../../../src/config/db.config'

const port = process.env.PORT;

let app: any

let dummyTask: any = {
    title: "task title",
    description: "task description",
    status: "pending"
}

describe(`Should perform Put for tasks`, () => {
    beforeAll(async () => {
        app = server.listen(port);
        await connection.sync();
        let response = await request(server).post("/tasks").send(dummyTask)
        dummyTask.id = response.body.data.id
    });
    
    it(`Update task with empty body return 400 with error`, async () => {
        const response = await request(server).put("/tasks").send({})
        expect(response.status).toBe(400)
    })

    it(`Update task with non exist id return 404 with`, async () => {
        const response = await request(server).put("/tasks").send({id: -1})
        expect(response.status).toBe(404)
    })
    
    it(`Update task with full data, return 200 and updated`, async () => {
        const response = await request(server).put("/tasks").send(dummyTask)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body).toHaveProperty("data")
        expect(response.body.meta).toHaveProperty("message")
        expect(response.body.data).toHaveProperty("id",dummyTask.id)
        expect(response.body.data).toHaveProperty("title",dummyTask.title)
        expect(response.body.data).toHaveProperty("description",dummyTask.description)
        expect(response.body.data).toHaveProperty("status",dummyTask.status)
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