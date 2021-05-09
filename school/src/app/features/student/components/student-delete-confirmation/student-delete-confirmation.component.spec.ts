import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentDeleteConfirmationComponent } from './student-delete-confirmation.component';

describe('StudentDeleteConfirmationComponent', () => {
  let component: StudentDeleteConfirmationComponent;
  let fixture: ComponentFixture<StudentDeleteConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
