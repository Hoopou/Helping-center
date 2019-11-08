import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class Immeuble implements IList{      

    settingsPath: string = environment.API_URL + "settings/Immeubles";

    constructor(
        public id       :number,
        public nom      :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): Immeuble{
        return new Immeuble(0, "", true, true);
    }

    public getValue(){
        return this.nom;
    }

    public setValue(text: string){
        this.nom = text;
    }

    getList<Immeuble>(api: ApiService): Observable<Immeuble[]>{
        return api.settingsService.getList<Immeuble>(Immeuble.empty());
    }
}