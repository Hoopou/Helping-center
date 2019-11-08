import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class CategorieEmploye implements IList{

    settingsPath: string = environment.API_URL + "settings/CategorieEmployes";

    constructor(
        public id               :number,
        public titrePoste       :string,
        public isNew            :boolean = false,
        public isEditing        :boolean = false
    ){}

    public static empty(): CategorieEmploye{
        return new CategorieEmploye(0, "", true, true);
    }

    getValue(){
        return this.titrePoste;
    }

    setValue(text: string){
        this.titrePoste = text;
    }

    getList<CategorieEmploye>(api: ApiService): Observable<CategorieEmploye[]>{
        return api.settingsService.getList<CategorieEmploye>(CategorieEmploye.empty());
    }
}