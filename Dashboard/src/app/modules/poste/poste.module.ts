import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosteRoutingModule } from './poste-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PosteComponent } from './views/poste/poste.component';
import { PosteViewComponent } from './components/poste-view/poste-view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PosteComponent, PosteViewComponent],
  imports: [
    CommonModule,
    PosteRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class PosteModule { }
