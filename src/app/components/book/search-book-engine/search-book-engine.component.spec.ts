import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookEngineComponent } from './search-book-engine.component';

describe('SearchBookEngineComponent', () => {
  let component: SearchBookEngineComponent;
  let fixture: ComponentFixture<SearchBookEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBookEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
