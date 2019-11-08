import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { FormBuilder } from '@angular/forms';
import { alertMsg } from '../../../../core/models/alert.model';
import { Poste } from '../../../../core/models/poste.model';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';
import { Etat } from '../../../../core/models/Settings/etat.model';

@Component({
  selector: 'poste-view',
  templateUrl: './poste-view.component.html',
  styleUrls: ['./poste-view.component.scss']
})
export class PosteViewComponent implements OnInit {

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }
  error: alertMsg[] = [];
  message: alertMsg[] = [];

  etats: Etat[] = []

  posteId:number = 0;
  poste: Poste = Poste.empty();

  loading = true;

  requestSent = false;

  ngOnInit() {
    
    if(!isNumber(parseInt(this.route.snapshot.paramMap.get("id"))) || parseInt(this.route.snapshot.paramMap.get("id")) < 0){
      this.router.navigateByUrl('/postes');
    }
    this.posteId = parseInt(this.route.snapshot.paramMap.get("id"));
    if(this.posteId != 0){
      this.api.posteService.getPoste(this.posteId).subscribe(
        (poste: Poste)=>{
          this.poste = poste;
        },
        (error) =>{
          this.error.push(new alertMsg('Error', error.message));
        }
      );
    }
    this.api.settingsService.getList<Etat>(Etat.empty()).subscribe(
      (etats)=>{
        this.etats = etats;
        this.loading = false;
      },
      (error) => {
        console.log("error" , error);
        this.error.push(new alertMsg('Error', error.message));
      }
    );
  }

  close(){
    this.router.navigateByUrl('/postes');
  }

  save(){
    this.requestSent = true;
    if(this.posteId != 0 ){
      this.updatePoste();
    }else{
      this.addPoste();
    }
  }

  updatePoste(){
    console.log("Je sauvegarde: " , this.poste);
    this.api.posteService.updatePoste(this.poste).subscribe(
      (success) => {
        this.close();
      },
      (error) =>{
        this.error.push(new alertMsg("ERROR", error.message));
        this.requestSent = false;
      }
    );
  }

  addPoste(){
    console.log("J'ajoute le poste: " , this.poste);
    this.api.posteService.addPoste(this.poste).subscribe(
      (success) => {
        this.close();
      },
      (error) =>{
        this.error.push(new alertMsg("ERROR", error.message));
        this.requestSent = false;
      }
    );
  }

}
