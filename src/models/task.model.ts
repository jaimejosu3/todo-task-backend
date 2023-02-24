import { Optional, Required } from "joi-typescript-validator/lib/decorators/BaseDecorators";
import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ITasks {
    id: number;
    title: string;
    description: string;
    status: string;
}

export class TasksAdd {
    @Required()
    title!: string;
    
    @Required()
    description!: string;
    
    @Required()
    status!: string;
}

export class TasksUpdate {
    @Required()
    id!: number;

    @Optional()
    title?: string;

    @Optional()
    description?: string;
    
    @Optional()
    status?: string;
}

@Table({
    timestamps: false,
    tableName: "tasks",
})
export class Tasks extends Model implements ITasks{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }) id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) status!: string;
}