import { ITask } from "../interfaces/task.interface";
import { TaskPriority, TaskStatus } from "../utils/task.utils";

export class Task implements ITask{
    id : number = -1;
    title: string = 'Task title';
    description: string = 'Task Description';
    priority: TaskPriority = TaskPriority.LOW;
    status: TaskStatus = TaskStatus.TODO;
    deadline: Date = new Date();
    created_at: Date = new Date();
    
    static fromJson(taskJson : ITask) : Task {
        return Object.assign(new Task(), taskJson);
    }

    toJson() : ITask {
        const taskJson : ITask = Object.assign({}, this);
        delete taskJson.id;
        return taskJson;
    }
}