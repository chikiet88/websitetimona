import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocnghecungchuyengiaComponent } from './hocnghecungchuyengia.component';

describe('HocnghecungchuyengiaComponent', () => {
  let component: HocnghecungchuyengiaComponent;
  let fixture: ComponentFixture<HocnghecungchuyengiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HocnghecungchuyengiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HocnghecungchuyengiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
