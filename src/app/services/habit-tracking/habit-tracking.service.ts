import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HabitTracking } from '../../models/habit-tracking.model';

@Injectable({
  providedIn: 'root'
})
export class HabitTrackingService {

  trackings : HabitTracking[] = [];
  currentIndex : number = 1;

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

  init(){

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
  
}
