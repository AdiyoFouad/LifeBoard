import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Budget } from '../../models/budget.model';
import { IBudget } from '../../interfaces/budget.interface';
import { BudgetCategory, BudgetType } from '../../utils/budget.utils';
import { IBudgetFilter } from '../../interfaces/budget-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  
  budgets : Budget[] = [];
  currentIndex = 1;

  constructor() {
    this.load();
  }

  load() {
    const budgetData = localStorage.getItem('lifeboard_budget');

    if (budgetData) {
      this.budgets = JSON.parse(budgetData).map((budget : IBudget) => Budget.fromJson(budget));
      this.currentIndex = Math.max(...this.budgets.map(((budget : Budget) => budget.id))) + 1;
    } else {
      this.init();
      this.save();
    }
  }

  save() {
    localStorage.setItem('lifeboard_budget', JSON.stringify(this.budgets))
  }

  init(){
    const budget0 = new Budget();
    budget0.id = this.currentIndex++;
    budget0.type = BudgetType.INCOME;
    budget0.amount = 2500;
    budget0.category = null;
    budget0.date = new Date('2025-08-01');

    const budget1 = new Budget();
    budget1.id = this.currentIndex++;
    budget1.type = BudgetType.EXPENSE;
    budget1.amount = 75;
    budget1.category = BudgetCategory.FOOD_DRINKS;
    budget1.date = new Date('2025-08-02');

    const budget2 = new Budget();
    budget2.id = this.currentIndex++;
    budget2.type = BudgetType.EXPENSE;
    budget2.amount = 50;
    budget2.category = BudgetCategory.TRANSPORT;
    budget2.date = new Date('2025-08-03');

    const budget3 = new Budget();
    budget3.id = this.currentIndex++;
    budget3.type = BudgetType.INCOME;
    budget3.amount = 1200;
    budget3.category = null;
    budget3.date = new Date('2025-08-04');

    const budget4 = new Budget();
    budget4.id = this.currentIndex++;
    budget4.type = BudgetType.EXPENSE;
    budget4.amount = 600;
    budget4.category = BudgetCategory.HOUSING;
    budget4.date = new Date('2025-08-05');

    const budget5 = new Budget();
    budget5.id = this.currentIndex++;
    budget5.type = BudgetType.EXPENSE;
    budget5.amount = 100;
    budget5.category = BudgetCategory.UTILITIES;
    budget5.date = new Date('2025-08-06');

    const budget6 = new Budget();
    budget6.id = this.currentIndex++;
    budget6.type = BudgetType.EXPENSE;
    budget6.amount = 200;
    budget6.category = BudgetCategory.HEALTH;
    budget6.date = new Date('2025-08-07');

    const budget7 = new Budget();
    budget7.id = this.currentIndex++;
    budget7.type = BudgetType.INCOME;
    budget7.amount = 300;
    budget7.category = null;
    budget7.date = new Date('2025-08-08');

    const budget8 = new Budget();
    budget8.id = this.currentIndex++;
    budget8.type = BudgetType.EXPENSE;
    budget8.amount = 150;
    budget8.category = BudgetCategory.ENTERTAINMENT;
    budget8.date = new Date('2025-08-09');

    const budget9 = new Budget();
    budget9.id = this.currentIndex++;
    budget9.type = BudgetType.EXPENSE;
    budget9.amount = 90;
    budget9.category = BudgetCategory.OTHERS;
    budget9.date = new Date('2025-08-10');

    this.budgets.push(budget0, budget1, budget2, budget3, budget4, budget5, budget6, budget7, budget8, budget9);

  }

  getAll() : Observable<Budget[]>{
    const sortedBudgets = this.budgets.sort(((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime())));
    return of(sortedBudgets);
  }

  get(id : number) : Observable<Budget | undefined>{
    const budget = this.budgets.find((originalBudget) => originalBudget?.id == id)
    return of(budget ? budget : undefined);
  }

  add(budget : Budget) : Observable<Budget>{
    budget.id = this.currentIndex++;
    this.budgets.push(budget);
    this.save();
    return of(budget);
  }

  update(budget : Budget) : Observable<Budget>{
    const budgetIndex = this.budgets.findIndex((originalBudget) => originalBudget?.id == budget.id);
    if (budgetIndex != -1) {
      this.budgets[budgetIndex] = budget;
    }
    this.save();
    return of(budget);
  }

  delete(id : number) : Observable<void>{
    const budgetIndex = this.budgets.findIndex((originalBudget) => originalBudget?.id == id);
    if (budgetIndex != -1) {
      this.budgets.slice(budgetIndex, 1);
    }
    this.save();
    return of();
  }

  getFilteredBudgets(filter : IBudgetFilter) : Observable<Budget[]>{
    const filteredBudgets = this.budgets
    .filter(budget => filter.type == 'All' ? true : budget.type == filter.type)
    .filter(budget => filter.range.startDate ? new Date(budget.date).getTime() > new Date(filter.range.startDate).getTime() : true)
    .filter(budget => filter.range.endDate ? new Date(budget.date).getTime() < new Date(filter.range.endDate).getTime() : true);
    return of(filteredBudgets);
  }

}
