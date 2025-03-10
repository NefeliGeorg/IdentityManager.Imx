import { TestBed } from '@angular/core/testing';

import { EmployeesReportingToMeGuardGuard } from './employees-reporting-to-me-guard.guard';

describe('EmployeesReportingToMeGuardGuard', () => {
  let guard: EmployeesReportingToMeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeesReportingToMeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
