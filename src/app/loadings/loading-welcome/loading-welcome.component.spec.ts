import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWelcomeComponent } from './loading-welcome.component';

describe('LoadingWelcomeComponent', () => {
  let component: LoadingWelcomeComponent;
  let fixture: ComponentFixture<LoadingWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
