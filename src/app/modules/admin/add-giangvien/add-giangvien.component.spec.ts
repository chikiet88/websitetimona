import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGiangvienComponent } from './add-giangvien.component';

describe('AddGiangvienComponent', () => {
  let component: AddGiangvienComponent;
  let fixture: ComponentFixture<AddGiangvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGiangvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
