import { TaskStatusIcon, TaskPriorityIcon, TaskStatus } from './../../utils/task.utils';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';


@Component({
  selector: 'app-task-view-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    DatePipe,
    MatIconModule,
    MatCardModule,
    MatChip
  ],
  templateUrl: './task-view-dialog.component.html',
  styleUrl: './task-view-dialog.component.css'
})
export class TaskViewDialogComponent {

  taskData : Task = Object.assign(new Task(), inject(MAT_DIALOG_DATA));

  TaskStatusIcon = TaskStatusIcon;
  TaskPriorityIcon = TaskPriorityIcon;
  TaskStatus = TaskStatus;


}
