import { IList } from './IList.model';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class RappelFormation implements IList{

    settingsPath: string = environment.API_URL + "settings/RappelFormations";

    constructor(
        public id       :number,
        public temps    :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): RappelFormation{
        return new RappelFormation(0, "0", true, true);
    }

    getValue(): string {
        return this.temps.toString();
    }
    setValue(text: string) {
        this.temps = text;
    }

    getList<RappelFormation>(api: ApiService): Observable<RappelFormation[]>{
        return api.settingsService.getList<RappelFormation>(RappelFormation.empty());
    }
}