import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { BudgetService } from '../../services/budget/budget.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddBudgetDialogComponent } from '../../components/add-budget-dialog/add-budget-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { BudgetFilterComponent } from '../../components/budget-filter/budget-filter.component';
import { IBudgetFilter } from '../../interfaces/budget-filter.interface';
import { Budget } from '../../models/budget.model';
import { BudgetType } from '../../utils/budget.utils';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-budget',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    BudgetFilterComponent,
    MatCard
],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit{
  private budgetService = inject(BudgetService);
  budgets = toSignal(this.budgetService.getAll());

  
  income = signal<number>(0);
  expenses = signal<number>(0);

  currentBalence = 0;

  displayedColumns: string[] = ['date', 'type', 'amount', 'category'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator! : MatPaginator;


  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.data = this.budgets() || [];
    this.setAmount(this.budgets() || []);
    this.currentBalence = this.income() - this.expenses();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addBudget(){
    const dialogRef = this.dialog.open(AddBudgetDialogComponent);
    dialogRef.afterClosed().subscribe(_ => {
      console.log("dd");
      this.dataSource.data = this.budgets() || [];
      this.setAmount(this.budgets() || []);
    });
  }

  filterBudget(filter : IBudgetFilter){
    this.budgetService.getFilteredBudgets(filter).subscribe(data => {
      this.dataSource.data = data;
      this.setAmount(data);
    });
  }

  setAmount(budgets : Budget[]){
    
          this.income.set(
            budgets.filter(budget => budget.type == BudgetType.INCOME).reduce((acc, b) => acc + b.amount, 0)
          );
          this.expenses.set(
            budgets.filter(budget => budget.type == BudgetType.EXPENSE).reduce((acc, b) => acc + b.amount, 0)
          );
  }
}
