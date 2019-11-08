import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCustomLoginComponent } from './users-custom-login.component';

describe('UsersCustomLoginComponent', () => {
  let component: UsersCustomLoginComponent;
  let fixture: ComponentFixture<UsersCustomLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCustomLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCustomLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
