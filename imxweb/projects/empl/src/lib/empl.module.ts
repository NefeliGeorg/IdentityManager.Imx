import { NgModule } from '@angular/core';
import { EmplComponent } from './empl.component';
import { EmployeesReportingToMeComponent } from './employees-reporting-to-me/employees-reporting-to-me.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { RouteGuardService } from 'qbm';
import { TilesModule } from 'qer';
import { EmplService } from './empl.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesReportingToMeGuardGuard } from './employees-reporting-to-me-guard.guard';
import { SideSheetComponent } from './side-sheet/side-sheet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EuiCoreModule } from '@elemental-ui/core';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'employees-reporting-to-me',
    component: EmployeesReportingToMeComponent,
    canActivate: [EmployeesReportingToMeGuardGuard],
    resolve: [RouteGuardService]
  }
];

@NgModule({
  declarations: [
    EmplComponent,
    EmployeesReportingToMeComponent,
    SideSheetComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(routes),
    TilesModule,
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    EuiCoreModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    EmplComponent
  ]
})

export class EmplModule {
  constructor(
    public readonly router: Router,
    private readonly initializer: EmplService) {
    console.log('🔥 EMPL loaded');
    this.initializer.onInit(routes);
    console.log('▶️ EMPL initialized');
  }

  ngOnInit(): void {
  }
}