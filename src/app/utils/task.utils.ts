export enum TaskPriority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}

export enum TaskStatus {
    TODO = 'To do',
    IN_PROGRESS = 'In progress',
    DONE = 'Done'
}

export interface IconOptions {
    icon:string,
    color:string
}

export const TaskPriorityIcon : {[key in TaskPriority]: IconOptions} = {
    [TaskPriority.HIGH] : {
        icon : 'priority_high',
        color:'#f44336'
    },
    [TaskPriority.MEDIUM] : {
        icon : 'warning',
        color:'#ff9800'
    },
    [TaskPriority.LOW] : {
        icon : 'low_priority',
        color:'#03a9f4'
    }
}

export const TaskStatusIcon : {[key in TaskStatus]: IconOptions} = {
    [TaskStatus.DONE] : {
        icon:'check_circle',
        color:'#4caf50'
    },
    [TaskStatus.IN_PROGRESS] : {
        icon:'autorenew',
        color:'#ff9800'
    },
    [TaskStatus.TODO] : {
        icon:'schedule',
        color:'#9e9e9e'
    },
}