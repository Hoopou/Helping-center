import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Email } from '../../../../core/models/opportunity/email.model';
import { environment } from '../../../../../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offer-tile',
  templateUrl: './offer-tile.component.html',
  styleUrls: ['./offer-tile.component.scss']
})
export class OfferTileComponent implements OnInit {

  @Input() offer: Email;
  @Output() onlanguagechange: EventEmitter<string> = new EventEmitter();
  
  translate: TranslateService;

  constructor(translate: TranslateService) { 
    this.translate = translate;
  }

  ngOnInit() {
  }

  changerLangue(langue: string){
    this.onlanguagechange.emit(langue);
  }

}
