import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestInfoComponent } from './admin-request-info.component';

describe('AdminRequestInfoComponent', () => {
  let component: AdminRequestInfoComponent;
  let fixture: ComponentFixture<AdminRequestInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRequestInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
