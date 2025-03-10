import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmplService } from './empl.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesReportingToMeGuardGuard implements CanActivate {
  constructor(
    public readonly service: EmplService,
    public readonly router: Router
  ) { }

  public canActivate(): boolean {
    if (this.service.numberofEmployees > 0) {
      return true;
    } else {
      return false;
    }
  }
}
