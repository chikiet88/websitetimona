import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerStudentComponent } from './corner-student.component';

describe('CornerStudentComponent', () => {
  let component: CornerStudentComponent;
  let fixture: ComponentFixture<CornerStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CornerStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
