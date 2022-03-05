import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhunxamPageComponent } from './phunxam-page.component';

describe('PhunxamPageComponent', () => {
  let component: PhunxamPageComponent;
  let fixture: ComponentFixture<PhunxamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhunxamPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhunxamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
