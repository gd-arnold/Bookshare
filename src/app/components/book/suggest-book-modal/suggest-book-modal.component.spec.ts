import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestBookModalComponent } from './suggest-book-modal.component';

describe('SuggestBookModalComponent', () => {
  let component: SuggestBookModalComponent;
  let fixture: ComponentFixture<SuggestBookModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestBookModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
