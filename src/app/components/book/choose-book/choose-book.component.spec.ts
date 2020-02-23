import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBookComponent } from './choose-book.component';

describe('ChooseBookComponent', () => {
  let component: ChooseBookComponent;
  let fixture: ComponentFixture<ChooseBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
