import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCourseComponent } from './carousel-course.component';

describe('CarouselCourseComponent', () => {
  let component: CarouselCourseComponent;
  let fixture: ComponentFixture<CarouselCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
