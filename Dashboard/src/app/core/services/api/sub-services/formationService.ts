import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Formation } from '../../../models/formation.model';
@Injectable({
    providedIn: 'root'
})
export class FormationService {
    constructor(private http: HttpClient) { }

    getList(): Observable<Formation[]> {
        return this.http.get<Formation[]>(environment.API_URL + "Formations");
    }

    addFormation(formation): Observable<Formation>{
        return this.http.post<Formation>(environment.API_URL + "formations" , formation);
    }

    updateFormation(formation:Formation): Observable<Formation>{
        return this.http.post<Formation>(environment.API_URL + "formations/update" , formation);
    }

    deleteFormation(formation:Formation): Observable<Formation>{
        return this.http.delete<Formation>(environment.API_URL + "formations/"+formation.id);
    }
}
