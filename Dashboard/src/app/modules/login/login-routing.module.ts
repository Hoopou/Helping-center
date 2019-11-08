import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    }
    ,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'users',
        component: LoginComponent,
        data: {
          title: 'users'
        }
      },
      {
        path: 'users/custom',
        component: LoginComponent,
        data: {
          title: 'custom'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
