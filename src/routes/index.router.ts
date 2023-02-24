import { Application, Router } from 'express'
import { Request, Response } from 'express'
import TasksRoute from './tasks/tasks.route'

const AllRoutes = (app: Application) => {
    
    app.use("/tasks",TasksRoute())

}

export default AllRoutes