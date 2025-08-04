import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, forkJoin, switchMap } from 'rxjs';
import { BudgetService } from '../../services/budget/budget.service';
import { HabitService } from '../../services/habit/habit.service';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-settings',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  isDarkMode = signal<boolean>(localStorage.getItem('theme') ? localStorage.getItem('theme') == 'dark-theme' : false);
  contentContainer = document.getElementById('main-content');

  private readonly dialog = inject(MatDialog);

  private budgetService = inject(BudgetService);
  private habitService = inject(HabitService);
  private trackingService = inject(HabitTrackingService);
  private taskservice = inject(TaskService);

  toggleTheme(isDark: boolean) : void {
    this.isDarkMode.set(isDark);
    this.contentContainer?.classList.remove('light-theme', 'dark-theme');
    this.contentContainer?.classList.add(isDark ? 'dark-theme' : 'light-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
  }

  resetData(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message : "Do you want clear all data ?",
        button: "Reset"
      }
    });
    dialogRef.afterClosed().pipe(
      filter(confirm => confirm),  
    ).subscribe( _ => {
      localStorage.clear();
      this.toggleTheme(false);
      this.servicesReset();
    });
    
  }

  servicesReset(){
    forkJoin([
      this.budgetService.reset(),
      this.habitService.reset(),
      this.taskservice.reset(),
      this.trackingService.reset()
    ]).subscribe();
  }


}
