import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPasswordTokenComponent } from './send-reset-password-token.component';

describe('SendResetPasswordTokenComponent', () => {
  let component: SendResetPasswordTokenComponent;
  let fixture: ComponentFixture<SendResetPasswordTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResetPasswordTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetPasswordTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
