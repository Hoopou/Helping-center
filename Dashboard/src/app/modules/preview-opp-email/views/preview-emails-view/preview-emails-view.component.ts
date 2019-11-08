import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/services/api/api.service';
import { Email } from "../../../../core/models/opportunity/email.model";
import { PotentialsEmails } from "../../../../core/models/opportunity/potentials-emails.model";
import { EmailValidator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-preview-emails-view',
  templateUrl: './preview-emails-view.component.html',
  styleUrls: [
    './preview-emails-view.component.scss'
  ]
})
export class PreviewEmailsViewComponent implements OnInit {
  oppId: string;
  opps: PotentialsEmails = PotentialsEmails.empty();
  CurrentMail: Email = Email.empty();
  ZohoOppIdInvalid: boolean = false;
  ServerDeconected: boolean = false;
  FinishLoading: boolean = false;
  NoEmails: boolean = false;
  translate: TranslateService;
  environment = environment;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {
    this.translate = translate;
  }

  ngOnInit() {
    this.oppId = this.route.snapshot.paramMap.get("oppid")
    // this.api.opportunityService.getOpportunity(this.oppId).subscribe(
    //   (data) => {
    //     this.opps = data;
    //     if (this.opps.emails.length > 0) {
    //       this.CurrentMail = this.opps.emails[0];
    //     } else {
    //       this.NoEmails = true;
    //     }
    //     this.translate.addLangs(Object.values(environment.languages));
    //     this.translate.use(this.opps.emails[0].language);
    //     this.FinishLoading = true;
    //   },
    //   (errors) => {
    //     console.log("errors", errors);
    //     if (errors.status == 400) {
    //       this.ZohoOppIdInvalid = true;
    //     }
    //     if (errors.status == 0) {
    //       this.ServerDeconected = true;
    //     }
    //     this.FinishLoading = true;
    //   }
    // );
  }

  changementCourriel(id: string) {
    this.CurrentMail = this.opps.emails.find(c => c.id == id);
    this.translate.use(this.CurrentMail.language);
  }

  changerLangue(id: string, language: string) {
    let email = this.opps.emails.find(e => e.id == id);

    if (email) {
      email.language = language;
    }
    this.translate.use(language);
  }
}