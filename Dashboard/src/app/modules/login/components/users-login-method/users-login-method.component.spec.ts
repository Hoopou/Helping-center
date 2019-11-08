import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoginMethodComponent } from './users-login-method.component';

describe('UsersLoginMethodComponent', () => {
  let component: UsersLoginMethodComponent;
  let fixture: ComponentFixture<UsersLoginMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersLoginMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLoginMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
