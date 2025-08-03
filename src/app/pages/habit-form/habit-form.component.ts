import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { HabitFrequency } from '../../utils/habit.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HabitService } from '../../services/habit/habit.service';
import { Habit } from '../../models/habit.model';
import { of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-habit-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit, OnDestroy{

  
  private habitService = inject(HabitService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private destroy$! : Subject<boolean>;

  private fb = inject(FormBuilder);
  formGroup = this.fb.group({
    name : ['', [Validators.required]],
    frequency: ['', [Validators.required]],
    goal : [1, [Validators.required, Validators.min(1)]]
  });

  habitId = -1;

  frequencies = Object.values(HabitFrequency);

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.habitId = parseInt(params['id']);
          return this.habitService.get(params['id']);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe(habit => {
      if (habit) {
        this.formGroup.patchValue(habit);
      }
    });
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  goBack(){
    this.router.navigate(['habits'])
  }

  submit(event : Event){
    event.preventDefault();
    if (this.formGroup.invalid) {
      return;
    }
    const habit = Object.assign(new Habit(), this.formGroup.value);
    if (this.habitId == -1) {
      this.habitService.add(habit).pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.goBack();
      });
    } else {
      habit.id = this.habitId;
      this.habitService.update(habit).pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.goBack();
      });
    }
  }

  deleteHabit(){
    this.habitService.delete(this.habitId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => {
        this.goBack();
  });
    
  }
  
  isFieldInvalid(field :string){
    return this.formGroup.get(field)?.invalid || (this.formGroup.get(field)?.dirty || this.formGroup.get(field)?.touched)
  }
}
