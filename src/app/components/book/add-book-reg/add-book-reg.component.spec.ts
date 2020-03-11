import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookRegComponent } from './add-book-reg.component';

describe('AddBookRegComponent', () => {
  let component: AddBookRegComponent;
  let fixture: ComponentFixture<AddBookRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
