import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskPriority, TaskStatus } from '../../utils/task.utils';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task.model';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-task',
  providers:[provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true
})
export class TaskComponent implements OnInit, OnDestroy {

  private destroy$! : Subject<boolean>;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  

  formGroup = this.fb.group({
    title : ['', [Validators.required]],
    description : [' '],
    priority : [TaskPriority.LOW, [Validators.required]],
    deadline : [new Date(), [Validators.required]],
    status : [TaskStatus.TODO, [Validators.required]], 
  });

  taskPriorities = Object.values(TaskPriority);
  taskStatus = Object.values(TaskStatus);
  
  

  taskId = -1;

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();

    this.route.params.pipe(
      switchMap(params => {
        if(params['id']){
          this.taskId = params['id'];
          return this.taskService.get(this.taskId);
        } else {
          return of();
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe( task => {
      if(task){
        this.formGroup.patchValue(task);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  submit(event : Event){
    event.preventDefault();
    const task = Object.assign(new Task(), this.formGroup.value);
    if (this.taskId == -1) {
      this.taskService.add(task).pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.goBack();
      });
    } else {
      task.id = this.taskId;
      this.taskService.update(task).pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.goBack();
    });
    }

  }

  isFieldInvalid(field :string){
    return this.formGroup.get(field)?.invalid && (this.formGroup.get(field)?.dirty || this.formGroup.get(field)?.touched)
  }

  goBack(){
    this.router.navigate(['tasks']);
  }

  deleteTask(){
    this.taskService.delete(this.taskId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.goBack();
    });
  }


}
