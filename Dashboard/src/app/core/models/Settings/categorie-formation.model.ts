import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class CategorieFormation implements IList{

    settingsPath: string = environment.API_URL + "settings/categorieformations";

    constructor(
        public id           :number,
        public nom          :string = "",
        public isNew        :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): CategorieFormation{
        return new CategorieFormation(0, "", true, true);
    }

    getValue(){
        return this.nom;
    }

    setValue(text: string){
        this.nom = text;
    }

    getList<CategorieFormation>(api: ApiService): Observable<CategorieFormation[]>{
        return api.settingsService.getList<CategorieFormation>(CategorieFormation.empty());
    }
}