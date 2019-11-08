import { Component, OnInit } from '@angular/core';
import { Employe } from '../../../../core/models/employe.model';
import { Civilite } from '../../../../core/models/Settings/civilite.model';
import { LangueEmploye } from '../../../../core/models/Settings/langue-employe.model';
import { CategorieEmploye } from '../../../../core/models/Settings/categorie-employe.model';
import { Etat } from '../../../../core/models/Settings/etat.model';
import { ApiService } from '../../../../core/services/api/api.service';
import { alertMsg } from '../../../../core/models/alert.model';
import { Formation } from '../../../../core/models/formation.model';
import { AffectationEmployeFormation } from '../../../../core/models/affectationEmployeFormation.model';
import { LoginInfo } from '../../../../core/models/login/loginInfo.model';
import { Validators, FormBuilder, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';

@Component({
  selector: 'employe-modal',
  templateUrl: './employe-modal.component.html',
  styleUrls: ['./employe-modal.component.scss']
})
export class EmployeModalComponent implements OnInit {

  error: alertMsg[] = [];
  message: alertMsg[] = [];

  employeId: number = -1;
  employe: Employe = Employe.empty();


  savingForm: FormGroup = new FormGroup({});


  civilities: Civilite[] = [];
  languages: LangueEmploye[] = [];
  etats: Etat[] = [];
  categorieEmployes: CategorieEmploye[] = [];
  superviseurs: Employe[] = [];
  employesAfectation: AffectationEmployeFormation[] = [];
  formations: Formation[] = [];
  
  employeFormations: Formation[] = [];
  selectionnedFormation: Formation = Formation.empty();

  utilisateur: LoginInfo = LoginInfo.empty();

  constructor(private api: ApiService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

    this.savingForm = this.fb.group({
      id: new FormControl(['', { disabled: true }]),
      number: new FormControl(['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')])]),
      civilite: new FormControl(['', [Validators.required, Validators.minLength(1)]]),
      firstname: new FormControl(['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z\\s\\-]+$')])]),
      lastname: new FormControl(['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z\\s\\-]+$')])]),
      language: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.compose([Validators.required, Validators.email, Validators.nullValidator])]),
      phone: new FormControl(['', Validators.pattern('^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$')]),
      state: new FormControl(['', Validators.required]),
      grade: new FormControl(['', Validators.required]),
      superviseur: new FormControl(['']),
      notes: new FormControl(['']),
      username: new FormControl(['']),
      password: new FormControl(['']),
    });
  }

  ngOnInit() {

    if (!isNumber(parseInt(this.route.snapshot.paramMap.get('id'))) || parseInt(this.route.snapshot.paramMap.get('id')) < 0) {
      this.router.navigateByUrl('/employes');
    }
    this.employeId = parseInt(this.route.snapshot.paramMap.get('id'));

    //get employe avec l'id 
    if (this.employeId != 0) {
      this.api.employeService.getEmployeById(this.employeId).subscribe(
        (employe) => {
          this.employe = employe;
          this.employe.superviseur = Employe.empty();
          this.initialize();
          console.log(this.employe);
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      );
    } else {
      this.employe = Employe.empty();
    }
    this.savingForm.get('id').disable();

  };
  initialize() {
    this.api.loginService.getUser().subscribe( //get user by id
      (data: LoginInfo[]) => {
        data.forEach(element => {
          if (element.employe.id == this.employe.id) {
            this.utilisateur = element;
            console.log("Test", this.utilisateur);
            this.utilisateur.exists = true;
          }
        });
      }
    );

    this.api.settingsService.getList<Civilite>(Civilite.empty()).subscribe(
      (data: Civilite[]) => {
        this.civilities = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Civilities"));
      }
    );

    this.api.settingsService.getList<LangueEmploye>(LangueEmploye.empty()).subscribe(
      (data: LangueEmploye[]) => {
        this.languages = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Employe's language"));
      }
    );

    this.api.settingsService.getList<Etat>(Etat.empty()).subscribe(
      (data: Etat[]) => {
        this.etats = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Employe's states"));
      }
    );

    this.api.settingsService.getList<CategorieEmploye>(CategorieEmploye.empty()).subscribe(
      (data: CategorieEmploye[]) => {
        this.categorieEmployes = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Employe's categories"));
      }
    );

    this.api.employeService.getList().subscribe(
      (data: Employe[]) => {
        this.superviseurs = data;
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Employes supervisor"));
      }
    );

    this.api.formationService.getList().subscribe(
      (data: Formation[]) => {
        this.formations = data;
        this.getEmployesFormations();
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the formations"));
      }
    );
  };

  getEmployesFormations(){
    this.api.employeService.getEmployeFormations(this.employe).subscribe(
      (data: AffectationEmployeFormation[]) => {
        this.employesAfectation = data;
        this.employesAfectation.forEach(element => {
          this.formations.forEach(formation => {
            if(formation.id == element.formation.id){           
              this.employeFormations.push(formation);
              this.formations = this.removeFromArray(this.formations, formation.id);
            }
          });
        })
        // console.log(this.formations);
        // console.log(this.employeFormations);
        // console.log("formations de l'employé reçues: ", this.employeFormations);
      },
      () => {
        this.error.push(new alertMsg("ERROR", "Unable to get the Employe's formations"));
      }
    );

  }

  getFormValidationErrors() {
    Object.keys(this.savingForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.savingForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  lowerFirstLetter(word: string) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  lowerFirstLetterInfos(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1);
  }

  onclose() {
    this.employe.isNew = true;
    this.router.navigateByUrl('/employes');
    this.savingForm.reset();
  }

  onconfirm() {
    if (this.savingForm.invalid) {
      this.getFormValidationErrors();
      return;
    }
    console.log("==========precessing de l'employe========== ");
    console.log("avec les formations ", this.employeFormations);

    // Validations au moment de la sauvegarde
    this.employe.courriel = this.employe.courriel.toLowerCase();
    this.employe.prenom = this.lowerFirstLetter(this.employe.prenom);
    this.employe.nom = this.lowerFirstLetter(this.employe.nom);
    this.employe.infoSupplementaire = this.lowerFirstLetterInfos(this.employe.infoSupplementaire);

    if (this.employe.superviseur != null) {
      this.employe.superviseur = this.superviseurs.find(s => s.prenom == this.employe.superviseur.prenom);
    }

    if (this.employe.isNew) {
      this.api.employeService.addEmploye(this.employe).subscribe(
        (data) => {
          this.employe.id = data.id;
          this.message.push(new alertMsg("SUCCESS", "Employe saved!"));
          this.employe.isNew = false;
          this.employe = data;
          this.addUser();
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      );
    } else {
      this.api.employeService.updateEmploye(this.employe).subscribe(
        (data) => {
          this.message.push(new alertMsg("SUCCESS", "Employe updated!"));
          this.addUser();
          this.router.navigateByUrl('/employes');
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      );
    }
  }
  addUser() {
    this.utilisateur.employe = this.employe;
    this.utilisateur.Username = this.utilisateur['username'];
    this.utilisateur.Password = this.utilisateur['password'];

    if (!this.utilisateur.exists) {

      this.api.loginService.addUser(this.utilisateur).subscribe(
        (data: LoginInfo) => {
          this.message.push(new alertMsg("SUCCESS", "User added!"));
          this.utilisateur = data;
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      )
    } else {
      this.api.loginService.updateUser(this.utilisateur).subscribe(
        (data) => {
          this.message.push(new alertMsg("SUCCESS", "User updated!"));
        },
        (error) => {
          this.error.push(new alertMsg("ERROR", error.message));
        }
      )
    }

  }

  addFormation(event) {
    this.api.employeService.addFormationToEmploye(this.employeId, event.id).subscribe(
      (data) => {
        this.employeFormations.push(event);
        this.formations = this.removeFromArray(this.formations, event.id);
        this.message.push(new alertMsg("SUCCESS", "Formation " + event.titre + " successfully added!"));
        this.router.navigateByUrl('/employes/' + this.employeId);
      },
      (error) => {
        this.error.push(new alertMsg("ERROR", error.message));
      }
    );
    this.selectionnedFormation = Formation.empty();
  }

  removeFormation(id){
    this.api.employeService.RemoveFormationOfEmploye(this.employeId, id).subscribe(
      (data) => {
        this.formations.push(this.employeFormations.find(f => f.id == id));
        this.employeFormations = this.removeFromArray(this.employeFormations, id);    
        this.message.push(new alertMsg("SUCCESS", "Formation " + this.formations.find(f => f.id == id).titre + " successfully removed!"));
      },
      (error) => {
        this.error.push(new alertMsg("ERROR", error.message));
      }
    )
  }













  //#region Helpers
  removeFromArray(array: any[], elementId){
    let newArray = [];
    array.forEach(element => {
      if(element.id != elementId){
        newArray.push(element);
      }
    })
    array = newArray;
    return newArray;
  }

  //#endregion
}
