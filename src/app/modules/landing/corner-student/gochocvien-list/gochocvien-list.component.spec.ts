import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GochocvienListComponent } from './gochocvien-list.component';

describe('GochocvienListComponent', () => {
  let component: GochocvienListComponent;
  let fixture: ComponentFixture<GochocvienListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GochocvienListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GochocvienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
