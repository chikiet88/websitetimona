import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TintucdetailComponent } from './tintucdetail.component';

describe('TintucdetailComponent', () => {
  let component: TintucdetailComponent;
  let fixture: ComponentFixture<TintucdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TintucdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TintucdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
