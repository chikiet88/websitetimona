import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeelPageComponent } from './student-feel-page.component';

describe('StudentFeelPageComponent', () => {
  let component: StudentFeelPageComponent;
  let fixture: ComponentFixture<StudentFeelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFeelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
