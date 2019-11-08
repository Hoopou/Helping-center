import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LookupFieldDto } from '../../../../core/models/lookupFieldDto';
import { Account } from '../../../../core/models/account.model';
import { zohoPicklist } from '../../../../core/models/zohoPicklist.model';
import { ActivatedRoute } from '@angular/router';
import { CategorieFormation } from '../../../../core/models/Settings/categorie-formation.model';
import { Formation } from '../../../../core/models/formation.model';
import { FrequenceFormation } from '../../../../core/models/Settings/frequence-formation.model';
import { RappelFormation } from '../../../../core/models/Settings/rappel-formation.model';
import { StatusFormation } from '../../../../core/models/Settings/status-formation.model';
import { TypeFormation } from '../../../../core/models/Settings/type-formation.model';
import { Etat } from '../../../../core/models/Settings/etat.model';
import { alertMsg } from '../../../../core/models/alert.model';

@Component({
  selector: 'app-formation-view',
  templateUrl: './formation-view.component.html',
  styleUrls: ['./formation-view.component.scss']
})
export class FormationViewComponent implements OnInit {
  data: Formation[] = [];

  categorieFormation: CategorieFormation[] = [CategorieFormation.empty()];
  frequenceFormation: FrequenceFormation[] = [FrequenceFormation.empty()];
  rappelFormation: RappelFormation[] = [RappelFormation.empty()];
  typeFormation: TypeFormation[] = [TypeFormation.empty()];
  statusFormation: StatusFormation[] = [StatusFormation.empty()];
  etatsFormation: Etat[] = [Etat.empty()];

  submitted = false;
  formErrors: any;
  formation: FormArray;

  error: alertMsg[] = [];
  message: alertMsg[] = [];

  loading = true;

  constructor(private api: ApiService, private fb: FormBuilder) {
    // Test authentication. If it fails, user is redirected to homepage.    
  
    // Init form
  }

  ngOnInit() {

    this.api.formationService.getList().subscribe(
      (formations) => {
        formations.forEach(element => {
          this.data.push(Formation.new(element));
        });        
        console.log("Formations reçues: ", this.data);
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the formations"));
      }
    );


    CategorieFormation.empty().getList<CategorieFormation>(this.api).subscribe(
      (data) => {
        this.categorieFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the CategorieFormation"));
      }
    );
    FrequenceFormation.empty().getList<FrequenceFormation>(this.api).subscribe(
      (data) => {
        this.frequenceFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the FrequenceFormation"));
      }
    );
    RappelFormation.empty().getList<RappelFormation>(this.api).subscribe(
      (data) => {
        this.rappelFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the RappelFormation"));
      }
    );
    TypeFormation.empty().getList<TypeFormation>(this.api).subscribe(
      (data) => {
        this.typeFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the TypeFormation"));
      }
    );
    StatusFormation.empty().getList<StatusFormation>(this.api).subscribe(
      (data) => {
        this.statusFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the StatusFormation"));
      }
    );
    Etat.empty().getList<Etat>(this.api).subscribe(
      (data) => {
        this.etatsFormation = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Etat"));
      }
    );


    this.loading = true;

  }

  // Called on from/to/grade fields change events

  modelChanged(
    object: Formation, // object is a reference to this.data[x]
    key: string,
    value: any,
    updateSSLFreight: boolean = false
  ) {
    return;

  }

  addColumn() {
    var tempformation = Formation.empty();
    tempformation.id = this.data.length + 1;
    this.data.push(tempformation);
    // setTimeout(() => {
    //   table.scrollTo({ left: 1000000, behavior: 'smooth' });
    // }, 1);
  }

  remove(index: number) {
    if (!this.data[index].isNew) {
      this.api.formationService.deleteFormation(this.data[index]).subscribe(
        (data) => {
          this.message.push(new alertMsg("SUCCESS", "Formation saved!"));
          this.data.splice(index, 1);
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      );
    } else {
      this.data.splice(index, 1);
      this.message.push(new alertMsg("SUCCESS", "Formation saved!"));
    }
  }

  edit(index: number) {
    console.log("editing", this.data);
    this.data[index].isEditing = true;
    return;
  }

  save(index: number) {
    if (this.data[index].isNew) {
      this.api.formationService.addFormation(this.data[index]).subscribe(
        (data) => {
          this.data[index].id = data.id;
          this.message.push(new alertMsg("SUCCESS", "Formation saved!"));
          this.data[index].isEditing = false;
          this.data[index].isNew = false;
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
          this.data[index].isEditing = true;
        }
      );
    } else {
      console.log("modification de la formations", this.data[index] );
      this.api.formationService.updateFormation(this.data[index]).subscribe(
        (data) => {
          this.message.push(new alertMsg("SUCCESS", "Formation updated!"));
          this.data[index].isEditing = false;
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
          this.data[index].isEditing = true;
        }
      );
    }
    return;
  }

  isEditing(index: number): boolean {
    return this.data[index].isEditing;
  }

  wantsRemove(index: number) {
    this.data[index].wantsRemove = true;
  }

  cancelRemoving(index: number) {
    this.data[index].wantsRemove = false;
  }

  getDateValue(date:Date){
    return date.toDateString();
  }
}
