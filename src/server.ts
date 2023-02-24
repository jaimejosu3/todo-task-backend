import express, { Application, Request, Response } from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import TasksRoute from './routes/tasks/tasks.route';
import AllRoutes from './routes/index.router';
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

AllRoutes(app)

app.get("/", (req: Request, res: Response): Response => {
    return res.json({ message: "Welcome to todo list backend 🤟" });
});


export default app;