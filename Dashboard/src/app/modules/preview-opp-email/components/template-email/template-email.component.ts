import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../../../core/models/opportunity/email.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent implements OnInit {
  @Input() currentMail: Email;
  @Input() language: string;
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
   }

  ngOnInit() {
  }

}
