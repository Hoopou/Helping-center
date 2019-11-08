import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { ApiService } from '../../../../core/services/api/api.service';
import { Etat } from '../../../../core/models/Settings/etat.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-tables-view',
  templateUrl: './tables-view.component.html',
  styleUrls: ['./tables-view.component.scss']
})
export class TablesViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  tableName:string;

  savingForm:FormGroup[] = [this.fb.group({
    id: ['', Validators.required],
    nomEtat: ['']
  })];

  ngOnInit() {
    // this.tableName = this.route.snapshot.paramMap.get("tableName");
    // if(!environment.SettingsTables.find(x => x.value == this.tableName)){
    //   console.log("N'EST PAS DANS LA TABLE DES SETTINGS");
    //   this.api.loginService.logout(false);
    // }


    this.api.settingsService.getList<Etat>(Etat.empty()).subscribe(
      (etats) => { 
        console.log("j'ai reussi a get les settings!!!", etats);
      },
      (error) => {
        console.log("erreur", error);
      }
    )
  }

}
