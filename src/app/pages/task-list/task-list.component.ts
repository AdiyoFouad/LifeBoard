import { AfterViewInit, Component, effect, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone:true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  private taskService = inject(TaskService);
  private router = inject(Router);
  tasks = toSignal(this.taskService.getAll());

  displayedColumns: string[] = ['title', 'priority', 'deadline', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor() {
    effect(() => {
      
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.tasks() || [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goToTask(id?:number){
    if (id) {
      this.router.navigate(['/task/' + id]);
    } else {
      this.router.navigate(['/task']);
    }
  }

  
}
