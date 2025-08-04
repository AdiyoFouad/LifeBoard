import { Habit } from './../../models/habit.model';
import { Component, computed, inject, input, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { HabitDetailDialogComponent } from '../habit-detail-dialog/habit-detail-dialog.component';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';

@Component({
  selector: 'app-habit',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.css'
})
export class HabitComponent {
  
  private router = inject(Router);
  private readonly dialog = inject(MatDialog);
  habit = input<Habit>();
  private trackingService = inject(HabitTrackingService);

  habitProgress = signal<number>(-1);

  constructor (){

  }

  goUpdate(id:number){
    this.router.navigate(['/habit/' + id])
  }
  

  seeDetails(){
    const dialogRef = this.dialog.open(HabitDetailDialogComponent, {
      data: this.habit()
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.habitProgress.set(this.trackingService.calculateProgress(this.habit()!));
    });
  }
}
