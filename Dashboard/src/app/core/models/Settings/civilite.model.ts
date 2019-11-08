import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class Civilite implements IList{

    settingsPath: string = environment.API_URL + "settings/Civilites";

    constructor(
        public id       :number,
        public nom      :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): Civilite{
        return new Civilite(0, "", true, true);
    }

    getValue(){
        return this.nom;
    }

    setValue(text: string){
        this.nom = text;
    }

    getList<Civilite>(api: ApiService): Observable<Civilite[]>{
        return api.settingsService.getList<Civilite>(Civilite.empty());
    }
}