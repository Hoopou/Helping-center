import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConnectionViewComponent } from './app-connection-view.component';

describe('AppConnectionViewComponent', () => {
  let component: AppConnectionViewComponent;
  let fixture: ComponentFixture<AppConnectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConnectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConnectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
