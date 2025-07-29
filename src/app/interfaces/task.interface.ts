import { TaskPriority, TaskStatus } from "../utils/task.utils";

export interface ITask {
    id? : number,
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,
    deadline: Date,
    created_at: Date
}
