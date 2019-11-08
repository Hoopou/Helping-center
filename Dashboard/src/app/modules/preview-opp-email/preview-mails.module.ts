import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewEmailsViewComponent } from './views/preview-emails-view/preview-emails-view.component';
import { PreviewMailsRoutingModule } from './preview-mails-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TemplateEmailComponent } from './components/template-email/template-email.component';
import { OfferTileComponent } from './components/offer-tile/offer-tile.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [PreviewEmailsViewComponent, TemplateEmailComponent, OfferTileComponent],
  imports: [
    CommonModule,
    FormsModule,
    PreviewMailsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class PreviewMailsModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}