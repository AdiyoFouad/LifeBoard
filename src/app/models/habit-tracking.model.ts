import { IHabitTracking } from "../interfaces/habit.interface";

export class HabitTracking implements IHabitTracking{
    id: number = -1;
    habitId: number = 0;
    date: Date = new Date();
    completed: boolean = false;

    static fromJson(htJson : IHabitTracking) : HabitTracking {
        return Object.assign(new HabitTracking(), htJson);
    }
    
    toJson() : IHabitTracking {
        const htJson : IHabitTracking = Object.assign({}, this);
        delete htJson.id;
        return htJson;
    }

}