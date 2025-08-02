import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFilterComponent } from './budget-filter.component';

describe('BudgetFilterComponent', () => {
  let component: BudgetFilterComponent;
  let fixture: ComponentFixture<BudgetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
