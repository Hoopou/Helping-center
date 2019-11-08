import { Formation } from './formation.model'
import { Employe } from './employe.model'


export class AffectationEmployeFormation {
    
    constructor(
        public id: number,
        public employe: Employe = Employe.empty(),
        public formation:Formation = Formation.empty(),

        public isEditing:boolean = true,
        public wantsRemove:boolean = false,
        public isNew: boolean = false
    ){ }

    public static empty(): AffectationEmployeFormation {
        return new AffectationEmployeFormation(
          0,
          Employe.empty(),
          Formation.empty(),
          true,
          false,
          false
        );
    }
}