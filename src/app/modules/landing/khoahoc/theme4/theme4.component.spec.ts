import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme4Component } from './theme4.component';

describe('Theme4Component', () => {
  let component: Theme4Component;
  let fixture: ComponentFixture<Theme4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Theme4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
