import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialzedComponent } from './specialzed.component';

describe('SpecialzedComponent', () => {
  let component: SpecialzedComponent;
  let fixture: ComponentFixture<SpecialzedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialzedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialzedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
