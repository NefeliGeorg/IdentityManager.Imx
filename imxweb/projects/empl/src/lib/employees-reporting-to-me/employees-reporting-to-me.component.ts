import { Component, OnInit, ViewChild } from '@angular/core';
import { EmplService } from '../empl.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EuiSidesheetConfig, EuiSidesheetService } from '@elemental-ui/core';
import { SideSheetComponent } from '../side-sheet/side-sheet.component';

@Component({
  selector: 'imx-employees-reporting-to-me',
  templateUrl: './employees-reporting-to-me.component.html',
  styleUrls: ['./employees-reporting-to-me.component.scss']
})

export class EmployeesReportingToMeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
    public datasource: MatTableDataSource<any>;
    public displayedColumns: string[];
    public element: any;
  constructor(
    public readonly service: EmplService,
    private sidesheetService: EuiSidesheetService
  ) {

  }
  async ngOnInit(): Promise<void> {
    this.datasource = new MatTableDataSource(await this.service.Identities());
    this.displayedColumns = Object.keys(this.service.identityObject[0]);
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  openSidesheet(element): void {
    const config: EuiSidesheetConfig = {
      title: element.FirstName + " " + element.LastName,
      closeAriaLabel: 'Close',
      testId: 'eui-sidesheet-1',
      width: '600px',
    };
    this.sidesheetService.open(SideSheetComponent, config);
    this.service.updateData(element.ContactEmail);
  }
}