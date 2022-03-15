import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoahocListComponent } from './khoahoc-list.component';

describe('KhoahocListComponent', () => {
  let component: KhoahocListComponent;
  let fixture: ComponentFixture<KhoahocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhoahocListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoahocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
