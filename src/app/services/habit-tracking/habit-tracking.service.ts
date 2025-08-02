import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HabitTracking } from '../../models/habit-tracking.model';

@Injectable({
  providedIn: 'root'
})
export class HabitTrackingService {

  trackings : HabitTracking[] = [];
  currentIndex : number = 1;

  
  constructor(){
    this.load();
  }

  save(){
    localStorage.setItem('lifeboard_habit_tracking', JSON.stringify(this.trackings));
  }

  load(){
    const dataJson = localStorage.getItem('lifeboard_habit_tracking');
    if (dataJson) {
      this.trackings = JSON.parse(dataJson).map((trackingJson : any) => HabitTracking.fromJson(trackingJson));
      this.currentIndex = Math.max(...this.trackings.map(tracking => tracking.id))
    } else { 
      this.init();
      this.save();
    }
  }

  getTrackingByHabit(habitId: number) : Observable<HabitTracking[]>{
    return of(this.trackings.filter(t => t.id == habitId))
  }

  toggleTracking(habitId: number, date: Date) : Observable<void>{
    const trackingIndex = this.trackings.findIndex(t => t.id == habitId && t.date == date);
    if (trackingIndex != -1) {
      this.trackings[trackingIndex].completed = !this.trackings[trackingIndex].completed;
    } else {
      const tracking = new HabitTracking();
      tracking.id = this.currentIndex;
      tracking.date = date;
      tracking.completed = true;
      tracking.habitId = habitId;
      this.trackings.push(tracking);
      this.currentIndex++;
    }
    this.save();
    return of()
  }

  deleteTrackingByHabit(habitId : number) : void{
    this.trackings = this.trackings.filter(t => t.habitId != habitId);
    this.save();
  }

  
  init(){
    const tracking0 = new HabitTracking();
    tracking0.id = this.currentIndex++;
    tracking0.habitId = 0;
    tracking0.date = new Date('2025-08-01');
    tracking0.completed = true;
    this.trackings.push(tracking0);

    const tracking1 = new HabitTracking();
    tracking1.id = this.currentIndex++;
    tracking1.habitId = 1;
    tracking1.date = new Date('2025-08-01');
    tracking1.completed = false;
    this.trackings.push(tracking1);

    const tracking2 = new HabitTracking();
    tracking2.id = this.currentIndex++;
    tracking2.habitId = 3;
    tracking2.date = new Date('2025-08-01');
    tracking2.completed = true;
    this.trackings.push(tracking2);

    const tracking3 = new HabitTracking();
    tracking3.id = this.currentIndex++;
    tracking3.habitId = 2;
    tracking3.date = new Date('2025-08-01');
    tracking3.completed = false;
    this.trackings.push(tracking3);

    const tracking4 = new HabitTracking();
    tracking4.id = this.currentIndex++;
    tracking4.habitId = 4;
    tracking4.date = new Date('2025-08-02');
    tracking4.completed = true;
    this.trackings.push(tracking4);

    const tracking5 = new HabitTracking();
    tracking5.id = this.currentIndex++;
    tracking5.habitId = 5;
    tracking5.date = new Date('2025-08-02');
    tracking5.completed = true;
    this.trackings.push(tracking5);

    const tracking6 = new HabitTracking();
    tracking6.id = this.currentIndex++;
    tracking6.habitId = 6;
    tracking6.date = new Date('2025-08-02');
    tracking6.completed = false;
    this.trackings.push(tracking6);

    const tracking7 = new HabitTracking();
    tracking7.id = this.currentIndex++;
    tracking7.habitId = 8;
    tracking7.date = new Date('2025-08-02');
    tracking7.completed = true;
    this.trackings.push(tracking7);

    const tracking8 = new HabitTracking();
    tracking8.id = this.currentIndex++;
    tracking8.habitId = 1;
    tracking8.date = new Date('2025-08-02');
    tracking8.completed = false;
    this.trackings.push(tracking8);

    const tracking9 = new HabitTracking();
    tracking9.id = this.currentIndex++;
    tracking9.habitId = 9;
    tracking9.date = new Date('2025-08-02');
    tracking9.completed = true;
    this.trackings.push(tracking9);

    const tracking10 = new HabitTracking();
    tracking10.id = this.currentIndex++;
    tracking10.habitId = 0;
    tracking10.date = new Date('2025-08-03');
    tracking10.completed = true;
    this.trackings.push(tracking10);

    const tracking11 = new HabitTracking();
    tracking11.id = this.currentIndex++;
    tracking11.habitId = 2;
    tracking11.date = new Date('2025-08-03');
    tracking11.completed = true;
    this.trackings.push(tracking11);

    const tracking12 = new HabitTracking();
    tracking12.id = this.currentIndex++;
    tracking12.habitId = 2;
    tracking12.date = new Date('2025-08-03');
    tracking12.completed = false;
    this.trackings.push(tracking12);

    const tracking13 = new HabitTracking();
    tracking13.id = this.currentIndex++;
    tracking13.habitId = 3;
    tracking13.date = new Date('2025-08-03');
    tracking13.completed = true;
    this.trackings.push(tracking13);

    const tracking14 = new HabitTracking();
    tracking14.id = this.currentIndex++;
    tracking14.habitId = 4;
    tracking14.date = new Date('2025-08-03');
    tracking14.completed = false;
    this.trackings.push(tracking14);

    const tracking15 = new HabitTracking();
    tracking15.id = this.currentIndex++;
    tracking15.habitId = 3;
    tracking15.date = new Date('2025-08-03');
    tracking15.completed = true;
    this.trackings.push(tracking15);

    const tracking16 = new HabitTracking();
    tracking16.id = this.currentIndex++;
    tracking16.habitId = 5;
    tracking16.date = new Date('2025-08-03');
    tracking16.completed = true;
    this.trackings.push(tracking16);

    const tracking17 = new HabitTracking();
    tracking17.id = this.currentIndex++;
    tracking17.habitId = 7;
    tracking17.date = new Date('2025-08-03');
    tracking17.completed = false;
    this.trackings.push(tracking17);

    const tracking18 = new HabitTracking();
    tracking18.id = this.currentIndex++;
    tracking18.habitId = 8;
    tracking18.date = new Date('2025-08-03');
    tracking18.completed = true;
    this.trackings.push(tracking18);

    const tracking19 = new HabitTracking();
    tracking19.id = this.currentIndex++;
    tracking19.habitId = 9;
    tracking19.date = new Date('2025-08-03');
    tracking19.completed = false;
    this.trackings.push(tracking19);
  }

  
}
