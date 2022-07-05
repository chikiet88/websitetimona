import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuocthiphunxamComponent } from './cuocthiphunxam.component';

describe('CuocthiphunxamComponent', () => {
  let component: CuocthiphunxamComponent;
  let fixture: ComponentFixture<CuocthiphunxamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuocthiphunxamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuocthiphunxamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
