import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppConfigService, AuthenticationService, ExtService, MenuItem, MenuService, TabItem } from 'qbm';
import { EmplComponent } from './empl.component';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { BehaviorSubject } from 'rxjs';

interface identities {
  FirstName: string;
  LastName: string;
  UIDDepartment: string;
  ContactEmail: string;
}

@Injectable({
  providedIn: 'root'
})

export class EmplService {
  private myVariableSource = new BehaviorSubject<string>('');
  emailElement = this.myVariableSource.asObservable();

  public firstname: string;
  public lastname: string;
  public department: string;
  public email: string;
  public identityObject: any;
  public numberofEmployees: number;

  constructor(
    private readonly extService: ExtService,
    private readonly router: Router,
    private readonly config: AppConfigService,
    private readonly menuService: MenuService,
    private readonly authentication: AuthenticationService
  ){
    this.authentication.onSessionResponse.subscribe({
      next: sessionState => {
        if (sessionState.IsLoggedIn) {
          this.NumberOfIdentities();
        }
      }
    });
    this.setupMenu();
  }

  public onInit(routes: Route[]): void {
    this.addRoutes(routes);
    this.extService.register('Dashboard-SmallTiles', { instance: EmplComponent });
  }

  private addRoutes(routes: Route[]): void {
    const config = this.router.config;
    routes.forEach((route) => {
      config.unshift(route);
    });
    this.router.resetConfig(config);
  }

  public async Identities(): Promise<any> {
    this.identityObject = await this.config.apiClient.processRequest<identities>(this.GetIdentities());
    this.firstname = this.identityObject.FirstName;
    this.lastname = this.identityObject.LastName;
    this.department = this.identityObject.UIDDepartment;
    this.email = this.identityObject.ContactEmail;
    console.log(this.identityObject);
    return this.identityObject;
  }

  private GetIdentities(): MethodDescriptor<void> {
    return {
      path: `/portal/example/getidentities`,
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType:'json',
    };
  }

  public async NumberOfIdentities(): Promise<any> {
    this.numberofEmployees = await this.config.apiClient.processRequest<number>(this.GetNumberOfIdentities());
  }

  private GetNumberOfIdentities(): MethodDescriptor<void> {
    return {
      path: `/portal/example/hasidentities`,
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType:'json',
    };
  }

  private setupMenu(): void {
    this.menuService.addMenuFactories((preProps: string[], features: string[]) => {
      if(this.numberofEmployees > 0){
        const menu: MenuItem = {
          id: 'ROOT_Employees',
          title:'#LDS#My Employees',
          sorting: '90',
          route: 'employees-reporting-to-me'
        };
        return menu;
      }
    });
  }

  updateData(data: any) {
    this.myVariableSource.next(data);
  }
}