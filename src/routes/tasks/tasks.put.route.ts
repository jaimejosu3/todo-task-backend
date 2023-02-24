import { Router } from 'express'
import { Request, Response } from 'express'
import TasksController from '../../controllers/tasks.controller';

const PutTasksRoute = (router: Router, tasksController: TasksController) => {

    router.put('/', async (req: Request, res: Response) => {
        const generalResponse = await tasksController.update(req.body);
        return res.status(generalResponse.meta.code).send(generalResponse);
    })

}

export default PutTasksRoute