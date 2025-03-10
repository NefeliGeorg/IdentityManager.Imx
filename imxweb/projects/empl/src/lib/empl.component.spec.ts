import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplComponent } from './empl.component';

describe('EmplComponent', () => {
  let component: EmplComponent;
  let fixture: ComponentFixture<EmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
