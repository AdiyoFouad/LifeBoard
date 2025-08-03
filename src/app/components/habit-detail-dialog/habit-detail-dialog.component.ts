import { HabitFrequency } from './../../utils/habit.utils';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';
import { HabitTracking } from '../../models/habit-tracking.model';

@Component({
  selector: 'app-habit-detail-dialog',
  imports: [
    MatDialogModule,
    MatCheckboxModule
  ],
  templateUrl: './habit-detail-dialog.component.html',
  styleUrl: './habit-detail-dialog.component.css'
})
export class HabitDetailDialogComponent implements OnDestroy{

  habit : Habit = Object.assign(new Habit(), inject(MAT_DIALOG_DATA));

  HabitFrequency = HabitFrequency;
  weekDates : Date[] = this.getCurrentWeekDates();
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private trackingService = inject(HabitTrackingService);

  habitDailyTrackings =  signal<any[]>([]);

  habitWeeklyTrackings = signal<HabitTracking[]>([]);


  private dialogRef = inject(MatDialogRef<HabitDetailDialogComponent>);

  constructor(){
    
    if (this.habit.frequency == HabitFrequency.DAILY) {
      let i=0;
      this.weekDates.forEach(date => {
        this.trackingService.getTrackingByHabitAndDate(this.habit.id, date).subscribe(data => {
          this.habitDailyTrackings.update(values => {
            values[i] = data;
            if (data.length < this.habit.goal) {
              const nbre = this.habit.goal - data.length;
              for (let index = 0; index < nbre ; index++) {
                values[i].push(new HabitTracking());
              }
            }
            return values;
          });
          i++;
        })
      });
      //console.log(this.habitDailyTrackings());
    }

    if (this.habit.frequency == HabitFrequency.WEEKLY) {
      let i=0;
      this.weekDates.forEach(date => {
        this.trackingService.getTrackingByHabitAndDate(this.habit.id, date).subscribe(data => {
          this.habitWeeklyTrackings.update(values => { 
            values = [...values, ...data];
            return values;
          });
          i++;
        })
      });
      if (this.habitWeeklyTrackings().length < this.habit.goal) {
        const nbre = this.habit.goal - this.habitWeeklyTrackings().length;
        let nullTrackings : HabitTracking[] = [];
        for (let index = 0; index < nbre; index++) {
          nullTrackings.push(new HabitTracking());
        }
        this.habitWeeklyTrackings.update(values => { 
            values = [...values, ...nullTrackings];
            return values;
        });
      }
    }

  }

  private getCurrentWeekDates(): Date[] {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day == 0 ? -6 : 1 - day;

    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    monday.setDate(now.getDate() + diffToMonday);

    const weekDates : Date [] = [];

    for (let i = 0; i<7; i++){
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDates.push(d);
    }

    return weekDates;
  }

  toggleTracking(tracking : HabitTracking, dateIndex : number, date : Date){
    this.trackingService.toggleTracking(tracking.id, date, this.habit.id).subscribe(dataTracking => {
      if (this.habit.frequency == HabitFrequency.DAILY) {
        this.habitDailyTrackings.update(values => { 
          const tIndex = values[dateIndex].findIndex((t : any )=> t == tracking);
          if (tIndex != -1) {
            values[dateIndex][tIndex] = dataTracking;
          }
          return values;
        });
      } else if (this.habit.frequency == HabitFrequency.WEEKLY){

        this.habitWeeklyTrackings.update(values => {
          const tIndex = values.findIndex((t : any )=> t == tracking);
          if (tIndex != -1) {
            values[tIndex] = dataTracking;
          }
          return values;
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.dialogRef.close(this.habit.id);
  }

  

  futurDay(d: Date) : boolean {
    d = new Date(d);
    const now = new Date();
    return now.getTime() < d.getTime();
  }

}
