import { environment } from '../../../../environments/environment';
import { IList } from './IList.model';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

export class StatusFormation implements IList{

    settingsPath: string = environment.API_URL + "settings/StatusFormations";

    constructor(
        public id       :number,
        public nom      :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): StatusFormation{
        return new StatusFormation(0, "", true, true);
    }

    getValue(){
        return this.nom;
    }

    setValue(text: string){
        this.nom = text;
    }

    getList<StatusFormation>(api: ApiService): Observable<StatusFormation[]>{
        return api.settingsService.getList<StatusFormation>(StatusFormation.empty());
    }
}