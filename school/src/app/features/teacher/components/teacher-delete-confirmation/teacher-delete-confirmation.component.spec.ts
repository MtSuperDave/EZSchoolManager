import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherDeleteConfirmationComponent } from './teacher-delete-confirmation.component';

describe('TeacherDeleteConfirmationComponent', () => {
  let component: TeacherDeleteConfirmationComponent;
  let fixture: ComponentFixture<TeacherDeleteConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
