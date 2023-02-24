import { Router } from 'express'
import { Request, Response } from 'express'
import TasksController from '../../controllers/tasks.controller';
import { GeneralResponse } from '../../models/general.model';

const GetTasksRoute = (router: Router, tasksController: TasksController) => {

    router.get('/', async (req: Request,res: Response) => {
        const generalResponse = await tasksController.getAll();
        return res.status(generalResponse.meta.code).send(generalResponse);
    })

    router.get('/:id', async (req: Request,res: Response) => {
        let generalResponse: GeneralResponse
        if(req.params.id == "query") generalResponse = await tasksController.getByStatus(req.query.status);
        else generalResponse = await tasksController.getById(req.params.id);
        return res.status(generalResponse.meta.code).send(generalResponse);
    })
}

export default GetTasksRoute