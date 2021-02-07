import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPanelComponent } from './guest-panel.component';

describe('GuestPanelComponent', () => {
  let component: GuestPanelComponent;
  let fixture: ComponentFixture<GuestPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
