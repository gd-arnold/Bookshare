import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBooksRegComponent } from './user-books-reg.component';

describe('UserBooksRegComponent', () => {
  let component: UserBooksRegComponent;
  let fixture: ComponentFixture<UserBooksRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBooksRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBooksRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
