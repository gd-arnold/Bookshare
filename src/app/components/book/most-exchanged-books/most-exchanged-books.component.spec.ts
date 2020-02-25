import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostExchangedBooksComponent } from './most-exchanged-books.component';

describe('MostExchangedBooksComponent', () => {
  let component: MostExchangedBooksComponent;
  let fixture: ComponentFixture<MostExchangedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostExchangedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostExchangedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
