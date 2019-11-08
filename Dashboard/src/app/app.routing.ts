import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

export const routes: Routes = [
  
  {
    path: 'login',
    pathMatch: 'prefix',
    data: {
      title: 'Login'
    },    
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path:'formations',
        loadChildren: './modules/formation/formation.module#FormationModule'
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule'
      },
      // {
      //   path: 'PreviewOppEmail',
      //   loadChildren: './modules/preview-opp-email/preview-mails.module#PreviewMailsModule'
      // }
      {
        path: 'employes',
        loadChildren: './modules/employes/employes.module#EmployesModule'
      },
      {
        path: 'postes',
        loadChildren: './modules/poste/poste.module#PosteModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
