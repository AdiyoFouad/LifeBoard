import { AfterViewInit, Component, effect, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskViewDialogComponent } from '../../components/task-view-dialog/task-view-dialog.component';
import { Task } from '../../models/task.model';
import { IconOptions, TaskPriorityIcon, TaskStatus, TaskStatusIcon } from '../../utils/task.utils';
import { TaskFilterComponent } from "../../components/task-filter/task-filter.component";
import { ITaskFilter } from '../../interfaces/task-filter.interface';

@Component({
  selector: 'app-task-list',
  standalone:true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    KeyValuePipe,
    TaskFilterComponent
],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy{
  private taskService = inject(TaskService);
  private router = inject(Router);
  tasks = toSignal(this.taskService.getAll().pipe(
    map( tasks => tasks.slice().sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    )
  ));
  TaskStatusIcon = TaskStatusIcon;
  TaskPriorityIcon = TaskPriorityIcon;
  private readonly dialog = inject(MatDialog);
  private destroy$! : Subject<boolean>;

  displayedColumns: string[] = ['title', 'priority', 'deadline', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor() {
    effect(() => {

    });
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.dataSource.data = this.tasks() || [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  goToTask(id?:number){
    if (id) {
      this.router.navigate(['/task/' + id]);
    } else {
      this.router.navigate(['/task']);
    }
  }

  
  openTaskViewDialog(task: Task){
    const dialogRef = this.dialog.open(TaskViewDialogComponent, {
      data : task
    });
    dialogRef.afterClosed().pipe(
      filter(changeStatus => changeStatus),
      switchMap(_ => {
        const statuses = Object.values(TaskStatus);
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        task.status = nextStatus;
        return this.taskService.update(task);
      }), 
      tap()
    ).subscribe(_ => {
       this.dataSource.data = this.tasks() || [];
      });
  }

  getTaskStatusIconOptions(task : Task) : IconOptions{
    return TaskStatusIcon[task.status];
  }
  getTaskPriorityIconOptions(task : Task) : IconOptions{
    return TaskPriorityIcon[task.priority];
  }

  filterTasks(event : ITaskFilter){
    this.taskService.getFilteredTasks(event).pipe(
      map( tasks => tasks.slice().sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      ),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }


  
}
