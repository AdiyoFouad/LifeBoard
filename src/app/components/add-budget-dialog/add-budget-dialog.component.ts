import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { BudgetCategory, BudgetType } from '../../utils/budget.utils';
import { M } from "../../../../node_modules/@angular/material/form-field.d-e195lFUo";
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BudgetService } from '../../services/budget/budget.service';
import { Budget } from '../../models/budget.model';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-add-budget-dialog',
  providers:[provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
],
  templateUrl: './add-budget-dialog.component.html',
  styleUrl: './add-budget-dialog.component.css'
})
export class AddBudgetDialogComponent implements OnInit, OnDestroy{

  private fb = inject(FormBuilder);
  formGroup = this.fb.group({
    type: [BudgetType.INCOME, [Validators.required]],
    amount: [1, [Validators.required, Validators.min(1)]],
    category : [''],
    date : [new Date(), [Validators.required]]
  });
  private budgetService = inject(BudgetService);
  private subscriptions = new Subscription();

  budgetTypes = Object.values(BudgetType); 
  categories = Object.values(BudgetCategory);

  ngOnInit(): void {
    this.formGroup.get('category')?.disable();
    this.formGroup.get('type')?.valueChanges.subscribe((value) => {
      const categoryControl = this.formGroup.get('category');

      if (value == BudgetType.INCOME) {
        categoryControl?.clearValidators();
        categoryControl?.disable();
        categoryControl?.setValue('');
      } else if (value == BudgetType.EXPENSE){
        categoryControl?.enable();
        categoryControl?.setValidators([Validators.required]);
      }

      categoryControl?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit(event : Event){
    event.preventDefault();
    if (this.formGroup.invalid) {
      return;
    }
    const budget = Object.assign(new Budget(), this.formGroup.value);
    const addBudgetSubscription = this.budgetService.add(budget).subscribe();
    this.subscriptions.add(addBudgetSubscription);
  }

  isFieldInvalid(field :string) :boolean | undefined{
    return this.formGroup.get(field)?.invalid || (this.formGroup.get(field)?.dirty || this.formGroup.get(field)?.touched)
  }

}
