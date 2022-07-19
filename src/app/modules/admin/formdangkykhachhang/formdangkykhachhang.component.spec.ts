import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdangkykhachhangComponent } from './formdangkykhachhang.component';

describe('FormdangkykhachhangComponent', () => {
  let component: FormdangkykhachhangComponent;
  let fixture: ComponentFixture<FormdangkykhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdangkykhachhangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdangkykhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
