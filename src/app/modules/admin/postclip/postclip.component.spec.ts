import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostclipComponent } from './postclip.component';

describe('PostclipComponent', () => {
  let component: PostclipComponent;
  let fixture: ComponentFixture<PostclipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostclipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostclipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
