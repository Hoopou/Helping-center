import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

export interface IList{
    settingsPath: string;

    getValue(): string;
    setValue(text: string);

    getList<IList>(api: ApiService): Observable<IList[]>;
    // updateModel<IList>(api: ApiService): Observable<IList[]>;
    // removeModel<IList>(api: ApiService): Observable<IList[]>;
}