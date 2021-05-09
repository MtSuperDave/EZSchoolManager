import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomDeleteConfirmationComponent } from './room-delete-confirmation.component';

describe('RoomDeleteConfirmationComponent', () => {
  let component: RoomDeleteConfirmationComponent;
  let fixture: ComponentFixture<RoomDeleteConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
