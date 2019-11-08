import { IList } from './IList.model';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';

export class Etat implements IList{
    
    settingsPath: string = environment.API_URL + "settings/etats";

    constructor(
        public id       :number,
        public nomEtat    :string,
        public isNew    :boolean = false,
        public isEditing    :boolean = false
    ){}

    public static empty(): Etat{
        return new Etat(0, "", true, true);
    }

    public getValue(): string {
        return this.nomEtat;
    }
    public setValue(text: string) {
        this.nomEtat = text;
    }

    getList<Etat>(api: ApiService): Observable<Etat[]>{
        return api.settingsService.getList<Etat>(Etat.empty());
    }

}