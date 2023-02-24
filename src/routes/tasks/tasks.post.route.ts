import { Router } from 'express'
import { Request, Response } from 'express'
import TasksController from '../../controllers/tasks.controller';

const PostTasksRoute = (router: Router, tasksController: TasksController) => {

    router.post('/', async (req: Request, res: Response) => {
        const generalResponse = await tasksController.add(req.body);
        return res.status(generalResponse.meta.code).send(generalResponse);
    })

}

export default PostTasksRoute