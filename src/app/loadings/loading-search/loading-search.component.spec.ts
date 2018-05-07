import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSearchComponent } from './loading-search.component';

describe('LoadingSearchComponent', () => {
  let component: LoadingSearchComponent;
  let fixture: ComponentFixture<LoadingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
