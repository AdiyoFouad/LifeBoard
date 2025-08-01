import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from '../../services/budget/budget.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

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

  ngOnInit(): void {
    this.dataSource.data = this.budgets() || [];
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  budgetAction(){

  }
}
