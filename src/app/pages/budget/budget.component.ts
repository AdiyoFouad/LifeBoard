import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-budget',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit{
  private budgetService = inject(BudgetService);
  budgets = toSignal(this.budgetService.getAll());

  displayedColumns: string[] = ['date', 'type', 'amount', 'category'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  
  constructor() {
    effect(() => {

    });
  }

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.data = this.budgets() || [];
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addBudget(){
    console.log(this.budgets());
    const dialogRef = this.dialog.open(AddBudgetDialogComponent);
    dialogRef.afterClosed().subscribe(_ => {
      this.dataSource.data = this.budgets() || [];
    });
  }
}
