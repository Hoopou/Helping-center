import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../../../../core/models/price-quote.model';
import { ApiService } from '../../../../core/services/api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupFieldDto } from '../../../../core/models/lookupFieldDto';
import { Account } from '../../../../core/models/account.model';
import { zohoPicklist } from '../../../../core/models/zohoPicklist.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { forEach } from '@angular/router/src/utils/collection';
import { Type } from '@angular/compiler';
import { CategorieFormation } from '../../../../core/models/Settings/categorie-formation.model';
import { Etat } from '../../../../core/models/Settings/etat.model';
import { Immeuble } from '../../../../core/models/Settings/immeuble.model';
import { TypeFormation } from '../../../../core/models/Settings/type-formation.model';
import { FrequenceFormation } from '../../../../core/models/Settings/frequence-formation.model';
import { StatusFormation } from '../../../../core/models/Settings/status-formation.model';
import { CategorieEmploye } from '../../../../core/models/Settings/categorie-employe.model';
import { Civilite } from '../../../../core/models/Settings/civilite.model';
import { LangueEmploye } from '../../../../core/models/Settings/langue-employe.model';
import { IList } from '../../../../core/models/Settings/IList.model';
import { TestBed } from '@angular/core/testing';
import { alertMsg } from '../../../../core/models/alert.model';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent implements OnInit {


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Test authentication. If it fails, user is redirected to homepage.
  }

  cookies: string;
  settings: basesettings[] = [];


  Etats: Etat[] = [];
  Immeubles: Immeuble[] = [];
  CategorieFormations: CategorieFormation[] = [];
  TypeFormations: TypeFormation[] = [];
  FrequenceFormations: FrequenceFormation[] = [];
  StatusFormations: StatusFormation[] = [];
  CategorieEmployes: CategorieEmploye[] = [];
  Civilites: Civilite[] = [];
  LangueEmployes: LangueEmploye[] = [];

  currentapp: string = null;

  error: alertMsg[] = [];
  message: alertMsg[] = [];

  ngOnInit() {
    // get tout les keys d'un priceQuote
    this.cookies = localStorage.getItem("Username");
    environment.SettingsTables.forEach(element => {
      this.settings.push(new basesettings(element.name , element.value));
    });

    this.currentapp = this.route.snapshot.paramMap.get("tableName");
    if (this.currentapp != null) {
      this.editapp(this.currentapp);
    }
  }

  getListModel(name: string) {
    switch (name) {
      case "Etat":
        return Etat;
      case "Immeubles":
        return Immeuble;
      case "CategorieFormation":
        return CategorieFormation;
      case "TypeFormation":
        return TypeFormation;
      case "FrequenceFormation":
        return FrequenceFormation;
      case "StatusFormation":
        return StatusFormation;
      case "CategorieEmploye":
        return CategorieEmploye;
      case "Civilite":
        return Civilite;
      case "LangueEmploye":
        return LangueEmploye;
    }
    return null;
  }

  getList(name: string = this.currentapp): any[] {
    switch (this.getListModel(name)) {
      case Etat:
        return this.Etats;
      case Immeuble:
        return this.Immeubles;
      case CategorieFormation:
        return this.CategorieFormations;
      case TypeFormation:
        return this.TypeFormations;
      case FrequenceFormation:
        return this.FrequenceFormations;
      case StatusFormation:
        return this.StatusFormations;
      case CategorieEmploye:
        return this.CategorieEmployes;
      case Civilite:
        return this.Civilites;
      case LangueEmploye:
        return this.LangueEmployes;
    }
  }

  editapp(name: string) {
    this.currentapp = name;

    this.api.settingsService.getList<IList>(this.getListModel(name).empty()).subscribe(
      (data: any) => {
        if (data == null || (data.length == 0 && this.getList(name).length == 0)) {
          this.addItem();
          return;
        }
        switch (this.getListModel(name)) {
          case Etat:
            this.Etats = data;
            return;
          case Immeuble:
            this.Immeubles = data;
            return;
          case CategorieFormation:
            this.CategorieFormations = data;
            return;
          case TypeFormation:
            this.TypeFormations = data;
            return;
          case FrequenceFormation:
            this.FrequenceFormations = data;
            return;
          case StatusFormation:
            this.StatusFormations = data;
            return;
          case CategorieEmploye:
            this.CategorieEmployes = data;
            return;
          case Civilite:
            this.Civilites = data;
            return;
          case LangueEmploye:
            this.LangueEmployes = data;
            return;
        }
      }
    );
  }

  getValue(name) {
    switch (this.getListModel(this.currentapp)) {
      case Etat:
        return name.nomEtat;
      case Immeuble:
        return name.nom;
      case CategorieFormation:
        return name.nom;
      case TypeFormation:
        return name.nom;
      case FrequenceFormation:
        return name.temps;
      case StatusFormation:
        return name.nom;
      case CategorieEmploye:
        return name.titrePoste;
      case Civilite:
        return name.nom;
      case LangueEmploye:
        return name.nom;
    }
  }

  setValue(item, value) {
    switch (this.getListModel(this.currentapp)) {
      case Etat:
        item.nomEtat = value;
        return;
      case Immeuble:
        item.nom = value;
        return;
      case CategorieFormation:
        item.nom = value;
        return;
      case TypeFormation:
        item.nom = value;
        return;
      case FrequenceFormation:
        item.temps = value;
        return;
      case StatusFormation:
        return item.nom = value;
        return;
      case CategorieEmploye:
        item.titrePoste = value;
        return;
      case Civilite:
        item.nom = value;
        return;
      case LangueEmploye:
        item.nom = value;
        return;
    }
  }

  addItem() {
    switch (this.getListModel(this.currentapp)) {
      case Etat:
        this.Etats.push(new Etat(this.Etats.length + 1, "", true, true));
        return;
      case Immeuble:
        this.Immeubles.push(new Immeuble(this.Immeubles.length + 1, "", true, true));
        return;
      case CategorieFormation:
        this.CategorieFormations.push(new CategorieFormation(this.CategorieFormations.length + 1, "", true, true));
        return;
      case TypeFormation:
        this.TypeFormations.push(new TypeFormation(this.TypeFormations.length + 1, "", true, true));
        return;
      case FrequenceFormation:
        this.FrequenceFormations.push(new FrequenceFormation(this.FrequenceFormations.length + 1, 0, true, true));
        return;
      case StatusFormation:
        this.StatusFormations.push(new StatusFormation(this.StatusFormations.length + 1, "", true, true));
        return;
      case CategorieEmploye:
        this.CategorieEmployes.push(new CategorieEmploye(this.CategorieEmployes.length + 1, "", true, true));
        return;
      case Civilite:
        this.Civilites.push(new Civilite(this.Civilites.length + 1, "", true, true));
        return;
      case LangueEmploye:
        this.LangueEmployes.push(new LangueEmploye(this.LangueEmployes.length + 1, "", true, true));
        return;
    }
  }

  removeItem(item, index) {
    //var index = this.getList().indexOf(item);
    var error = false;
    this.api.settingsService.deleteModel(this.getListModel(this.currentapp).empty(), item.id).subscribe(
      () => {
        this.message.push(new alertMsg("SUCCESS" , "Item removed!"))
      },
      (error) =>{
        this.error.push(new alertMsg("ERROR" , "An error occured while removing the item - "));
        error = true;
      }
    );

    if(error) return;

    switch (this.getListModel(this.currentapp)) {
      case Etat:
        this.getList().splice(index, 1);
        return;
      case Immeuble:
        this.getList().splice(index, 1);
        return;
      case CategorieFormation:
        this.getList().splice(index, 1);
        return;
      case TypeFormation:
        this.getList().splice(index, 1);
        return;
      case FrequenceFormation:
        this.getList().splice(index, 1);
        return;
      case StatusFormation:
        this.getList().splice(index, 1);
        return;
      case CategorieEmploye:
        this.getList().splice(index, 1);
        return;
      case Civilite:
        this.getList().splice(index, 1);
        return;
      case LangueEmploye:
        this.getList().splice(index, 1);
        return;
    }
  }

  valuechange(item, value) {
    this.setValue(this.getList()[this.getList().indexOf(item)], value);
    item.isEditing = true;
  }

  saveItem(item: any) {
    
    if (item.isNew) {
      console.log("ajout de la valeur " + this.getValue(item) + " au tableau " + this.currentapp);
      this.api.settingsService.addModel<IList>(item).subscribe(
        (data:any) => {
          console.log(data);
          this.getList()[this.getList().indexOf(item)].id = data.id;
          this.getList()[this.getList().indexOf(item)].isNew = false;
          item = data;
          this.message.push(new alertMsg("SUCCESS", "Item saved!"));
        },
        ()=>{
          this.error.push(new alertMsg("ERROR","An error occured while adding new entry!"));
        }
      );

    } else {
      console.log("Update de la valeur " + this.getValue(item) + " au tableau " + this.currentapp);
      console.log(item);      
      this.api.settingsService.updateModel<IList>(item).subscribe(
        (data) => {
          item = data;
          this.message.push(new alertMsg("SUCCESS","item updated"));
        },
        () => {
          this.error.push(new alertMsg("ERROR","An error occured while saving"));
        }
      );
    }
    item.isEditing = false;
  }
  
}

class basesettings{
  constructor(public name, public value){}
}