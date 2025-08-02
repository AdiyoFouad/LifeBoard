import { HabitFrequency } from "../utils/habit.utils";

export interface IHabit {
    id? : number;
    name: string;
    frequency : HabitFrequency,
    goal: number,
    progress?: number;
}

export interface IHabitTracking {
    id? : number,
    habitId : number,
    date : Date,
    completed : boolean
}
