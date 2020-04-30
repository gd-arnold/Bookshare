import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryInfoModalComponent } from './delivery-info-modal.component';

describe('RequestModalComponent', () => {
  let component: DeliveryInfoModalComponent;
  let fixture: ComponentFixture<DeliveryInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
