import { ITaskFilter } from './../../interfaces/task-filter.interface';
import { filter, map } from 'rxjs';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority, TaskStatus } from '../../utils/task.utils';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-filter',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    MatLabel,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css'
})
export class TaskFilterComponent implements OnInit{
  private fb = inject(FormBuilder);
  formGroup = this.fb.group({
    taskTitle : [''],
    taskPriority : ['All'],
    taskStatus : ['All'],
    taskLate: [false]
  });

  taskPriorities = ['All', ...Object.values(TaskPriority)];
  taskStatuses = ['All', ...Object.values(TaskStatus)];

  filterTasks = output<ITaskFilter>();

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      map(formData => {
        const filter : ITaskFilter = Object(formData);
        return filter;
      })
    ).subscribe( data => {
      this.filterTasks.emit(data);
    });
  }
}
