import { CategorieEmploye } from './Settings/categorie-employe.model';
import { LangueEmploye } from './Settings/langue-employe.model';
import { Civilite } from './Settings/civilite.model';
import { Etat } from './Settings/etat.model';
import { Formation } from './formation.model';

export class Employe {
    
    constructor(
        public id:number,
        public numero:string,
        public civilite: Civilite = Civilite.empty(),
        public prenom:string,
        public nom:string,
        public langueEmploye: LangueEmploye = LangueEmploye.empty(),
        public cellulaire:string,
        public etat:Etat = Etat.empty(),
        public categorieEmploye:CategorieEmploye = CategorieEmploye.empty(),
        public courriel:string,
        public superviseur:Employe = Employe.empty(),
        public infoSupplementaire:string,
        
        public isEditing:boolean = true,
        public wantsRemove:boolean = false,
        public isNew: boolean = false
    ) { }

    public static new (employe){
        return new Employe(
            employe.id,
            employe.numero,
            employe.civilite,
            employe.prenom,
            employe.nom,
            employe.langueEmploye,
            employe.cellulaire,
            employe.etat,
            employe.categorieEmploye,
            employe.courriel,
            employe.Superviseur,
            employe.infoSupplementaire,

            true,
            false,
            false
        );
    }

    public static empty(): Employe {
        return new Employe(
            0,
            "",
            Civilite.empty(),
            "",
            "",
            LangueEmploye.empty(),
            "",
            Etat.empty(),
            CategorieEmploye.empty(),
            "",
            null,
            "",
            
            true,
            false,
            true
        );
    }
}