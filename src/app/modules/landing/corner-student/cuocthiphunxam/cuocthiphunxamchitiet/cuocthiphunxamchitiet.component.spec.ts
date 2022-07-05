import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuocthiphunxamchitietComponent } from './cuocthiphunxamchitiet.component';

describe('CuocthiphunxamchitietComponent', () => {
  let component: CuocthiphunxamchitietComponent;
  let fixture: ComponentFixture<CuocthiphunxamchitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuocthiphunxamchitietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuocthiphunxamchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
