import { Injectable } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { Observable, of } from 'rxjs';
import { HabitTrackingService } from '../habit-tracking/habit-tracking.service';
import { HabitTracking } from '../../models/habit-tracking.model';
import { HabitFrequency } from '../../utils/habit.utils';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  habits : Habit[] = [];
  currentIndex : number = 1;

  constructor(){
    this.load();
  }
  
  save(){
    localStorage.setItem('lifeboard_habits', JSON.stringify(this.habits));
  }

  load(){
    const dataJson = localStorage.getItem('lifeboard_habits');

    if (dataJson) {
      this.habits = JSON.parse(dataJson).map((habitJson:any) => Habit.fromJson(habitJson));
      this.currentIndex = Math.max(...this.habits.map(habit => habit.id))
    } else { 
      this.init();
      this.save();
    }  
  }

  init(){

  }

  getAll() : Observable<Habit[]>{
    return of(this.habits);
  }

  get(id : number) : Observable<Habit | undefined>{
    const habit = this.habits.find(originalHabit => originalHabit.id = id);
    return of(habit ? habit : undefined);
  }

  add(habit: Habit) : Observable<Habit>{
    habit.id = this.currentIndex;
    this.habits.push(habit);
    this.currentIndex++;
    this.save();
    return of(habit);
  }

  update(habit: Habit) : Observable<Habit>{
    const hIndex = this.habits.findIndex(h => h.id == habit.id);
    if (hIndex != -1) {
      this.habits[hIndex] = habit;
    }
    this.save();
    return of(habit);
  }

  delete(id: number) : Observable<void>{
    const hIndex = this.habits.findIndex(h => h.id == id);
    if (hIndex != -1) {
      this.habits.splice(hIndex, 1);
    }
    this.save();
    return of();
  }

  calculateProgress(id : number) : number{
    const trackingService = new HabitTrackingService();
    let tracking : HabitTracking[] = [];
    const habit = this.habits.find(originalHabit => originalHabit.id = id);
    if (!habit) {
      return 0;
    }
    trackingService.getTrackingByHabit(habit.id).subscribe(data => {
      tracking = data
    });

    if (habit.frequency === HabitFrequency.DAILY) {
      const totalDays = new Set(tracking.map(t => t.date)).size;
      const completedDays = tracking.filter(t => t.completed).length;
      return totalDays === 0 ? 0 : Math.round(completedDays / totalDays)*100;
    }

    if (habit.frequency === HabitFrequency.WEEKLY) {
      const completedDays = tracking.filter(t => t.completed).length;
      return habit.goal > 0 ? Math.min(Math.round((completedDays / habit.goal)*100), 100) : 0;
    }

    return 0;
  }

}
