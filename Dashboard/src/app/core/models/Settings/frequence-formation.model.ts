import { IList } from './IList.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

export class FrequenceFormation implements IList{
    
    settingsPath: string = environment.API_URL + "settings/FrequenceFormations";

    constructor(
        public id       :number,
        public temps    :number,
        
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(){
        return new FrequenceFormation(0, 0, true, true);
    }

    getValue() {
        return this.temps.toString()
    }
    setValue(text) {
        this.temps = text;
    }

    getList<FrequenceFormation>(api: ApiService): Observable<FrequenceFormation[]>{
        return api.settingsService.getList<FrequenceFormation>(FrequenceFormation.empty());
    }
    
}