import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEmailsViewComponent } from './preview-emails-view.component';

describe('PreviewEmailsViewComponent', () => {
  let component: PreviewEmailsViewComponent;
  let fixture: ComponentFixture<PreviewEmailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewEmailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEmailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
