import { TaskStatus } from './../utils/task.utils';
import { TaskPriority } from "../utils/task.utils";

export interface ITaskFilter {
    taskTitle: string,
    taskPriority: TaskPriority | 'All',
    taskStatus : TaskStatus | 'All',
    taskLate : boolean
}
