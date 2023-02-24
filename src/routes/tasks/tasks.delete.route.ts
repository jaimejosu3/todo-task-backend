import { Router } from 'express'
import { Request, Response } from 'express'
import TasksController from '../../controllers/tasks.controller';

const DeleteTasksRoute = (router: Router, tasksController: TasksController) => {

    router.delete('/:id', async (req: Request,res: Response) => {
        const generalResponse = await tasksController.deleteById(req.params.id);
        return res.status(generalResponse.meta.code).send(generalResponse);
    })

}

export default DeleteTasksRoute