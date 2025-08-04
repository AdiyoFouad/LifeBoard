import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { BudgetService } from '../../services/budget/budget.service';
import { HabitService } from '../../services/habit/habit.service';
import { HabitTrackingService } from '../../services/habit-tracking/habit-tracking.service';
import { TaskService } from '../../services/task/task.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskStatus } from '../../utils/task.utils';
import { BudgetCategory, BudgetType } from '../../utils/budget.utils';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    BaseChartDirective,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit, OnDestroy{

  private budgetService = inject(BudgetService);
  private habitService = inject(HabitService);
  private trackingService = inject(HabitTrackingService);
  private taskService = inject(TaskService);

  income = signal<number>(0);
  expenses = signal<number>(0);

  private destroy$! : Subject<boolean>;

  taskChartLabels: string[] = ["Completed", "In Progress", "To do"];
  tasksChartData : ChartConfiguration<'pie'>['data'] = {
    labels: this.taskChartLabels,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      }
    ]
  };

  budgetChartLabels: string[] = ["Income", "Expense"];
  budgetsChartData : ChartConfiguration<'bar'>['data'] = {
    labels: this.budgetChartLabels,
    datasets: [
      {
        label: 'Budget',
        data: [0, 0],
        backgroundColor: ['green', 'red'],
      },
    ]
  };

  habitsChartData : ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Current Week Progression', '',],
    datasets: [
      {
        label: '%',
        data: [0, 0],
        backgroundColor:["#3f51b5", "whitesmoke"]
      }
    ]
  };

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.loadTasksChart();
    this.loadBudgetChart();
    this.loadHabitsChart();
    
  }

  private loadTasksChart(){
    this.taskService.getAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe(tasks => {
      const completed = tasks.filter(t => t.status == TaskStatus.DONE).length;
      const inProgress = tasks.filter(t => t.status == TaskStatus.IN_PROGRESS).length;
      const todo = tasks.filter(t => t.status == TaskStatus.TODO).length;
      this.tasksChartData.datasets[0].data = [completed, inProgress, todo];
    });
  }

  private loadBudgetChart(){
    this.budgetService.getAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe(budgets => {
      this.income.set(
        budgets.filter(budget => budget.type == BudgetType.INCOME).reduce((acc, b) => acc + b.amount, 0)
      );
      this.expenses.set(
        budgets.filter(budget => budget.type == BudgetType.EXPENSE).reduce((acc, b) => acc + b.amount, 0)
      );
    });
    this.budgetsChartData.datasets[0].data = [this.income(), this.expenses()];
  }

  private loadHabitsChart(){
    this.habitService.getAll().pipe(
      takeUntil(this.destroy$),
    ).subscribe(habits => {
      let avg = (habits.reduce((acc, h) => acc + this.trackingService.calculateProgress(h), 0)) / habits.length;
      avg = Math.round(avg);
      this.habitsChartData.datasets[0].data = [avg, 100 - avg];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
