import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { TablesViewComponent } from './views/tables-view/tables-view.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        component: SettingsViewComponent,        
      },
      // {
      // path: ':tableName',
      // component: SettingsViewComponent,
      // },
      {
        path: 'test',
        component: TablesViewComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
