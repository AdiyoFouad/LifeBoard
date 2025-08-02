import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BudgetType } from '../../utils/budget.utils';
import { IBudgetFilter } from '../../interfaces/budget-filter.interface';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-filter',
  providers:[provideNativeDateAdapter()],
  standalone:true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './budget-filter.component.html',
  styleUrl: './budget-filter.component.css'
})
export class BudgetFilterComponent implements OnInit, OnDestroy{
  private fb = inject(FormBuilder);
  formGroup = this.fb.group({
    range : this.fb.group({
      startDate: [null],
      endDate: [null]
    }),
    type : ['All']
  });

  types = ['All', ...Object.values(BudgetType)];
  filterBudget = output<IBudgetFilter>();
  valuesChangeSubscription : Subscription | null = null;


  ngOnInit(): void {
    this.valuesChangeSubscription = this.formGroup.valueChanges.pipe(
      map(raw => {
        let data : IBudgetFilter = Object(raw);
        return data;
      })
    ).subscribe(data => {
      this.filterBudget.emit(data);
    });
  }

  ngOnDestroy(): void {
    this.valuesChangeSubscription?.unsubscribe();
  }
}
