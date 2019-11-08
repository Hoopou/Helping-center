import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IList } from '../../../models/Settings/IList.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SettingsService {  
      
    constructor(
        private http: HttpClient
        ) { }

    getList<T>(model): Observable<T[]>{
        return this.http.get<T[]>(model.settingsPath);
    }

    addModel<T>(model): Observable<T>{
        return this.http.post<T>(model.settingsPath, model);
    }

    updateModel<T>(model): Observable<T>{
        return this.http.post<T>(model.settingsPath+"/update", model);
    }

    deleteModel(model, id): Observable<any>{
        console.log("deleting - end " , model.settingsPath+ "/" + id);
        return this.http.delete(model.settingsPath+ "/" + id);
    }
}