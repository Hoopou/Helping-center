import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class LangueEmploye implements IList{

    settingsPath: string = environment.API_URL + "settings/LangueEmployes";

    constructor(
        public id       :number,
        public nom      :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): LangueEmploye{
        return new LangueEmploye(0, "", true, true);
    }

    getValue(){
        return this.nom;
    }

    setValue(text: string){
        this.nom = text;
    }

    getList<LangueEmploye>(api: ApiService): Observable<LangueEmploye[]>{
        return api.settingsService.getList<LangueEmploye>(LangueEmploye.empty());
    }
}