import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './views/login/login.component';
import { UsersCustomLoginComponent } from './components/users-custom-signin/users-custom-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UsersLoginMethodComponent } from './components/users-login-method/users-login-method.component';

@NgModule({
  declarations: [LoginComponent, UsersCustomLoginComponent, MenuComponent, UsersLoginMethodComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class LoginModule { }
