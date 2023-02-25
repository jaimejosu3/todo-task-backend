import { Validate } from "joi-typescript-validator/lib/utils/BuilderUtils";
import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { GeneralResponse } from "../models/general.model";
import { TasksAdd, TasksUpdate, Tasks } from "../models/task.model";
import { isInt } from "../utils/common.util";
import { performBadRequestResponse, performNotFoundResponse, performSuccessResponse } from "../utils/response.util";

@Tags("tasks")
@Route("tasks")
export default class TasksController { 

    /**
     * Retrieves all task existing
     */
    @Get()
    public async getAll(): Promise<GeneralResponse> { 
        let tasks = await Tasks.findAll();
        return performSuccessResponse(tasks, "Tasks obtained successfully.")
    }

    /**
     * Retrieves all pending task existing
     */
    @Get("/query")
    public async getByStatus(@Query() status: any): Promise<GeneralResponse> { 
        let tasks = await Tasks.findAll({
            where: {
                status: status
            }
        });
        return performSuccessResponse(tasks, "Tasks obtained successfully.")
    }

    /**
     * Retrieves an task with id
     */
    @Get("{id}")
    public async getById(id: string): Promise<GeneralResponse> {
        if(!isInt(id)) return performBadRequestResponse("id is invalid format (requires number)")
        let task = await Tasks.findByPk(id);
        if(!task) return performNotFoundResponse("Not found task with id "+id);
        return performSuccessResponse(task, "Task obtained successfully")            
    }

    /**
     * Add a task
     */
    @Post()
    public async add(@Body() task: TasksAdd): Promise<GeneralResponse> {
        let validationResult = Validate(TasksAdd,task).error
        if(validationResult) return performBadRequestResponse(validationResult.message)

        let newTask = await Tasks.create({...task});
        return performSuccessResponse(newTask,"Task created successfully");
    }

    /**
     * Update a task
     */
    @Put()
    public async update(@Body() task: TasksUpdate): Promise<GeneralResponse> {
        let validationResult = Validate(TasksUpdate,task).error
        if(validationResult) return performBadRequestResponse(validationResult.message)
        
        let affected = await Tasks.update({...task},{ 
            where: {
                id: task.id
            }
        });
        if(affected[0] === 0) return performNotFoundResponse("Not found task for update")
        let updatedTask = await Tasks.findByPk(task.id);
        return performSuccessResponse(updatedTask,"Task updated successfully");        
    }

    /**
     * Delete a task by id
     */
    @Delete("{id}")
    public async deleteById(id: string): Promise<GeneralResponse> {
        if(!isInt(id)) return performBadRequestResponse("id is invalid format (requires number)")
        let task = await Tasks.destroy({ 
            where: {
                id: id
            }
        });
        if(!task) return performNotFoundResponse("Not found task with id "+id);
        return performSuccessResponse(task, "Task deleted successfully")            
    }
}
