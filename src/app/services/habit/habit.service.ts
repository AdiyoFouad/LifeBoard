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
      this.currentIndex = Math.max(...this.habits.map(habit => habit.id)) + 1;
    } else { 
      this.init();
      this.save();
    }
    
  }

  init(){
    const habit0 = new Habit();
    habit0.id = this.currentIndex++;
    habit0.name = 'Boire 2L d\'eau';
    habit0.frequency = HabitFrequency.DAILY;
    habit0.goal = 1;
    this.habits.push(habit0);

    const habit1 = new Habit();
    habit1.id = this.currentIndex++;
    habit1.name = 'Faire 30 min de sport';
    habit1.frequency = HabitFrequency.DAILY;
    habit1.goal = 1;
    this.habits.push(habit1);

    const habit2 = new Habit();
    habit2.id = this.currentIndex++;
    habit2.name = 'Lire 10 pages';
    habit2.frequency = HabitFrequency.DAILY;
    habit2.goal = 1;
    this.habits.push(habit2);

    const habit3 = new Habit();
    habit3.id = this.currentIndex++;
    habit3.name = 'Méditer 15 minutes';
    habit3.frequency = HabitFrequency.DAILY;
    habit3.goal = 1;
    this.habits.push(habit3);

    const habit4 = new Habit();
    habit4.id = this.currentIndex++;
    habit4.name = 'Aller courir';
    habit4.frequency = HabitFrequency.WEEKLY;
    habit4.goal = 3;
    this.habits.push(habit4);

    const habit5 = new Habit();
    habit5.id = this.currentIndex++;
    habit5.name = 'Écrire dans un journal';
    habit5.frequency = HabitFrequency.DAILY;
    habit5.goal = 1;
    this.habits.push(habit5);

    const habit6 = new Habit();
    habit6.id = this.currentIndex++;
    habit6.name = 'Appeler un proche';
    habit6.frequency = HabitFrequency.WEEKLY;
    habit6.goal = 2;
    this.habits.push(habit6);

    const habit7 = new Habit();
    habit7.id = this.currentIndex++;
    habit7.name = 'Préparer ses repas à l’avance';
    habit7.frequency = HabitFrequency.WEEKLY;
    habit7.goal = 1;
    this.habits.push(habit7);

    const habit8 = new Habit();
    habit8.id = this.currentIndex++;
    habit8.name = 'Dormir 8h';
    habit8.frequency = HabitFrequency.DAILY;
    habit8.goal = 1;
    this.habits.push(habit8);

    const habit9 = new Habit();
    habit9.id = this.currentIndex++;
    habit9.name = 'Limiter les réseaux sociaux';
    habit9.frequency = HabitFrequency.DAILY;
    habit9.goal = 1;
    this.habits.push(habit9);
  }

  getAll() : Observable<Habit[]>{
    return of(this.habits);
  }

  get(id : number) : Observable<Habit | undefined>{
    const habit = this.habits.find(originalHabit => originalHabit.id == id);
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

}
