import { Habit } from './../../models/habit.model';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

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
  habit = input<Habit>();

  
  goUpdate(id:number){
    this.router.navigate(['/habit/' + id])
  }

  seeDetails(){

  }
}
