import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestBooksComponent } from './newest-books.component';

describe('NewestBooksComponent', () => {
  let component: NewestBooksComponent;
  let fixture: ComponentFixture<NewestBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
