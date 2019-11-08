import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../core/services/api/api.service';
import { alertMsg } from '../../../../core/models/alert.model';
import { Poste } from '../../../../core/models/poste.model';
import { Router } from '@angular/router';
import { Etat } from '../../../../core/models/Settings/etat.model';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router,) { }
  error: alertMsg[] = [];
  message: alertMsg[] = [];
  loading = true;

  showDeactivated: boolean = false;

  postes: Poste[] = [];

  tableFilter = [{id: 1 , name: 'Only Activated'},{id: 2 , name: 'All'}];
  selectedTableFilter = this.tableFilter.find(v => v.id == 1);

  ngOnInit() {
    this.applyFilter(); 
  }

  new(){
    this.router.navigateByUrl('/postes/' + 0);
  }

  choosePoste(poste){
    this.router.navigateByUrl('/postes/' + poste.id);
  }

  applyFilter(){
    console.log("Current filter:" , this.selectedTableFilter);
    this.loading = true;
    this.api.posteService.getAll().subscribe(
      (postes: Poste[])=>{
        console.log("Postes received: " , postes);
        switch(this.selectedTableFilter.id){
          case 1://Only activated
            this.postes = [];
            postes.forEach(poste=>{
              if(poste.etat.id == 1){ //id des actifs est 1
                this.postes.push(poste);
              }
            });
            this.loading = false;
            break;
          case  2: //All
            this.postes = postes;
            this.loading = false;
            break;
        }

        
        this.loading = false;
      },
      (error) => {
        this.error.push(new alertMsg("ERROR", error.message));        
      }
    );
  }

}
