import { CategorieFormation } from './Settings/categorie-formation.model';
import { FrequenceFormation } from './Settings/frequence-formation.model';
import { RappelFormation } from './Settings/rappel-formation.model';
import { Etat } from './Settings/etat.model';
import { TypeFormation } from './Settings/type-formation.model';
import { StatusFormation } from './Settings/status-formation.model';


export class Formation {
    
    constructor(
        public id:                  number,
        public numero:              string,
        public titre:               string,
        public categorieFormation:  CategorieFormation = CategorieFormation.empty(),
        public frequenceFormation:  FrequenceFormation = FrequenceFormation.empty(),
        public rappelFormation:     FrequenceFormation = FrequenceFormation.empty(),
        public typeFormation:       TypeFormation = TypeFormation.empty(), //modalite
        public statusFormation:     StatusFormation = StatusFormation.empty(),
        public duree_Seconde:       number,
        public remarques:           string,
        public etat:                Etat = Etat.empty(),

        
        public isEditing:boolean = false,
        public wantsRemove:boolean = false,
        public isNew: boolean = false,
    ) { }

    public static new (formation){
        return new Formation(
            formation.id,
            formation.numero,
            formation.titre,
            formation.categorieFormation,
            formation.frequenceFormation,
            formation.rappelFormation,
            formation.typeFormation,
            formation.statusFormation,
            formation.duree_Seconde,
            formation.remarques,
            formation.etat,
            false,
            false,
            false
        );
    }

    public static empty(): Formation {
        return new Formation(
            0, 
            "", 
            "",
            CategorieFormation.empty(),
            FrequenceFormation.empty(),
            FrequenceFormation.empty(),
            TypeFormation.empty(),
            StatusFormation.empty(),
            0,
            "",
            Etat.empty(),
            false,
            false,
            true
        );
    }
}