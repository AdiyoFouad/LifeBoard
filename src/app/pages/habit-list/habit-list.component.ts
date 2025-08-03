import { HabitService } from './../../services/habit/habit.service';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Habit } from '../../models/habit.model';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';
import { map } from 'rxjs';
import { HabitComponent } from '../../components/habit/habit.component';

@Component({
  selector: 'app-habit-list',
  imports: [
    MatIconModule,
    HabitComponent,
    MatButtonModule,
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

}
