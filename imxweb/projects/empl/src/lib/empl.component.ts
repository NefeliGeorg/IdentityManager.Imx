import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmplService } from './empl.service';

@Component({
  selector: 'imx-empl',
  templateUrl: `./empl.component.html`,
  styles: [
  ]
})
export class EmplComponent implements OnInit {
  constructor(
    public readonly router: Router,
    public readonly service: EmplService
  ) {}

  ngOnInit(): void {

  }

  public GoToMyEmployees(): void {
    this.router.navigate(['employees-reporting-to-me'])
  }
}
