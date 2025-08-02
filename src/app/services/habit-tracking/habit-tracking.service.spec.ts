import { TestBed } from '@angular/core/testing';

import { HabitTrackingService } from './habit-tracking.service';

describe('HabitTrackingService', () => {
  let service: HabitTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
