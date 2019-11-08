import { IList } from './IList.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

export class TypeFormation implements IList{

    settingsPath: string = environment.API_URL + "settings/typeFormations";

    constructor(
        public id       :number,
        public nom      :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): TypeFormation{
        return new TypeFormation(0, "", true, true);
    }

    getValue(): string {
        return this.nom;
    }
    setValue(text: string) {
        this.nom = text;
    }

    getList<TypeFormation>(api: ApiService): Observable<TypeFormation[]>{
        return api.settingsService.getList<TypeFormation>(TypeFormation.empty());
    }
}