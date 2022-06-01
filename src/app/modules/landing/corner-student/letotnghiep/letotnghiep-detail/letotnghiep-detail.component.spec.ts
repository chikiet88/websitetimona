import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetotnghiepDetailComponent } from './letotnghiep-detail.component';

describe('LetotnghiepDetailComponent', () => {
  let component: LetotnghiepDetailComponent;
  let fixture: ComponentFixture<LetotnghiepDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetotnghiepDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetotnghiepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
