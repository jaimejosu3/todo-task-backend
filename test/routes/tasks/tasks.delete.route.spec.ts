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

describe(`Should perform Delete for tasks`, () => {
    beforeAll(async () => {
        app = server.listen(port);
        await connection.sync();
        let response = await request(server).post("/tasks").send(dummyTask)
        dummyTask.id = response.body.data.id
    });
    
    it(`Delete task with existing id`, async () => {
        const response = await request(server).delete("/tasks/"+ dummyTask.id)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("meta")
        expect(response.body.meta).toHaveProperty("code", 200)
        expect(response.body.meta).toHaveProperty("message","Task deleted successfully")
    })

    it(`Delete task with non existing id`, async () => {
        const response = await request(server).delete("/tasks/"+ dummyTask.id)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("meta")
        expect(response.body.meta).toHaveProperty("code", 404)
    })

    it(`Delete task with non valid id`, async () => {
        const response = await request(server).delete("/tasks/sometext")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("meta")
        expect(response.body.meta).toHaveProperty("code", 400)
    })

    afterAll( done => {
        connection.close()
        app.close()
        done()
    })
})