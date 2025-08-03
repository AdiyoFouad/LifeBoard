import { IHabit } from "../interfaces/habit.interface";
import { HabitFrequency } from "../utils/habit.utils";

export class Habit implements IHabit{
    id: number = -1;
    name: string = "New Habit";
    frequency: HabitFrequency = HabitFrequency.DAILY;
    goal: number = 1;
    progress: number | undefined;

    static fromJson(habitJson : IHabit) : Habit {
        return Object.assign(new Habit(), habitJson);
    }
        
    toJson() : IHabit {
        const habitJson : IHabit = Object.assign({}, this);
        delete habitJson.id;
        return habitJson;
    }

    updateProgress(newProgress : number) : Habit {
        this.progress = newProgress;
        return this;
    }

}