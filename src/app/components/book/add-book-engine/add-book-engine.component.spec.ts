import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookEngineComponent } from './add-book-engine.component';

describe('AddBookEngineComponent', () => {
  let component: AddBookEngineComponent;
  let fixture: ComponentFixture<AddBookEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
