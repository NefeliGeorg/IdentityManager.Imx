import { Component, OnInit } from '@angular/core';
import { EmplService } from '../empl.service';
import { FormControl } from '@angular/forms';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { AppConfigService } from 'qbm';

interface ValidationError {
  column: string;
  errorMsg: string;
}

interface Request {
  ContactEmail: string;
  CustomProperty: string;
  ExitDate: string | Date;
}

@Component({
  selector: 'imx-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss']
})
export class SideSheetComponent implements OnInit {
  public employeesEmail: string;
  public date = new FormControl();
  result: ValidationError[];
  public isUpdating = false;

  public request: Request = {
    ContactEmail: '',
    CustomProperty: '',
    ExitDate: null
  };

  constructor(
    public readonly service: EmplService,
    private readonly config: AppConfigService,
  ) {

  }

  ngOnInit(): void {
    this.service.emailElement.subscribe(data => {
      this.employeesEmail = data;
    });
    console.log(this.employeesEmail);
  }

  public validateAPICall(data: any): MethodDescriptor<ValidationError[]> {
    return {
        path: `/portal/example/updateCustomProperty`,
        parameters: [
            {
                name: 'data',
                value: data,
                in: 'body',
            },
        ],
        method: 'POST',
        headers: {
            'imx-timezone': TimeZoneInfo.get(),
        },
        credentials: 'include',
        observe: 'response',
        responseType: 'json',
    };
  }


  public async updateData(): Promise<void> {
    try {
      this.request = {
        ContactEmail: this.employeesEmail,
        CustomProperty: this.request.CustomProperty,
        ExitDate: this.date.value.format('YYYY-MM-DD HH:mm:ss.SSS')
      }
      console.log(this.request);
      this.result = await this.config.apiClient.processRequest(this.validateAPICall(this.request))
      this.isUpdating = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      this.isUpdating = false;
      this.request.CustomProperty = '';
      this.date = new FormControl();
    }
  }
}