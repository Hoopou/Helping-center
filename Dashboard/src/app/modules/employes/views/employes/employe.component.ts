import { Component, OnInit, Output } from '@angular/core';
import { alertMsg } from '../../../../core/models/alert.model';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../core/services/api/api.service';
import { Employe } from '../../../../core/models/employe.model';
import { Civilite } from '../../../../core/models/Settings/civilite.model';
import { EventEmitter } from 'events';
import { EmployeModalComponent } from '../../../../modules/employes/components/employe-modal/employe-modal.component';
import { Router } from '@angular/router';

@Component({
  providers: [EmployeModalComponent],
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeViewComponent implements OnInit {

  error: alertMsg[] = [];
  message: alertMsg[] = [];

  employes: Employe[] = [];
  
  constructor(private api: ApiService, private fb: FormBuilder, private employeModal: EmployeModalComponent, private router: Router) { }
  
  ngOnInit() {
    this.loadEmployes();
  }

  chooseEmploye(id){
    this.router.navigateByUrl('/employes/'+this.employes[id].id);
  }

  new(){
    this.router.navigateByUrl('/employes/0');
  }

  private loadEmployes(){
    //reset variables
    this.employes = [];

    this.api.employeService.getList().subscribe(
      (employes) => {
        console.log(employes);
        employes.forEach(element => {

          if(element.superviseur == null){
            element.superviseur = Employe.empty();
          }

          this.employes.push(Employe.new(element));
        });
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the employes"));
      }
    );
  }

}
