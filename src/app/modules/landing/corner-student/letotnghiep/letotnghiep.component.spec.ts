import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetotnghiepComponent } from './letotnghiep.component';

describe('LetotnghiepComponent', () => {
  let component: LetotnghiepComponent;
  let fixture: ComponentFixture<LetotnghiepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetotnghiepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetotnghiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
