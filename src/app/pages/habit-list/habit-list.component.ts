import { HabitService } from './../../services/habit/habit.service';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Habit } from '../../models/habit.model';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';
import { map } from 'rxjs';
import { HabitComponent } from '../../components/habit/habit.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-habit-list',
  imports: [
    MatIconModule,
    HabitComponent,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.css'
})
export class HabitListComponent {
  private router = inject(Router);
  private habitService = inject(HabitService);
  private habitTrackingService = inject(HabitTrackingService);


  habits = toSignal<Habit[]>(this.habitService.getAll().pipe(
    map((habitWithoutProgress) => habitWithoutProgress.map((habitWithoutProgress) => {
      const calculatedProgress = this.habitTrackingService.calculateProgress(habitWithoutProgress);
      return habitWithoutProgress.updateProgress(calculatedProgress);
    }))
  ));

  
  addHabit(){
    this.router.navigate(['/habit']);
  }

  reload(id : number){
    
  }

  
  getCurrentWeekDates(): Date[] {
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

}
