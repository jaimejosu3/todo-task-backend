import { Router } from 'express'
import TasksController from '../../controllers/tasks.controller';
import DeleteTasksRoute from './tasks.delete.route';
import GetTasksRoute from './tasks.get.route';
import PostTasksRoute from './tasks.post.route';
import PutTasksRoute from './tasks.put.route';

const TasksRoute = () => {
    const router = Router()
    const tasksController = new TasksController();

    GetTasksRoute(router,tasksController)
    PostTasksRoute(router, tasksController)
    PutTasksRoute(router, tasksController)
    DeleteTasksRoute(router, tasksController)

    return router
}

export default TasksRoute