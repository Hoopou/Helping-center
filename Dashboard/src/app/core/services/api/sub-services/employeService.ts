import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Formation } from '../../../models/formation.model';
import { Employe } from '../../../models/employe.model';
import { AffectationEmployeFormation } from '../../../models/affectationEmployeFormation.model';
@Injectable({
    providedIn: 'root'
})
export class EmployeService {
    constructor(private http: HttpClient) { }

    getList(): Observable<Employe[]> {
        return this.http.get<Employe[]>(environment.API_URL + "Employes");
    }

    getEmployeById(id: number): Observable<Employe> {
        return this.http.get<Employe>(environment.API_URL + "Employes/"+id);
    }

    addEmploye(employe): Observable<Employe>{
        return this.http.post<Employe>(environment.API_URL + "Employes" , employe);
    }

    updateEmploye(employe:Employe): Observable<Employe>{
        return this.http.post<Employe>(environment.API_URL + "Employes/update" , employe);
    }

    deleteEmploye(employe:Employe): Observable<Employe>{
        return this.http.delete<Employe>(environment.API_URL + "Employes/"+employe.id);
    }

    getEmployeFormations(employe:Employe): Observable<AffectationEmployeFormation[]>{
        return this.http.get<AffectationEmployeFormation[]>(environment.API_URL + "employes/" + employe.id + "/Formations");
    }

    setEmployeFormations(employe:Employe, affectation: Formation[]): Observable<any>{
        console.log("loog",employe, affectation);
        return this.http.post<any>(environment.API_URL + "employes/" + employe.id + "/Formations", affectation);
    }

    addFormationToEmploye(employeID: number, formationID: number){
        return this.http.post<any>(environment.API_URL + "employes/" + employeID + "/Formations/"+ formationID, "");
    }

    RemoveFormationOfEmploye(employeID, formationID){
        return this.http.delete<any>(environment.API_URL + "employes/" + employeID + "/Formations/" + formationID);
    }
}
