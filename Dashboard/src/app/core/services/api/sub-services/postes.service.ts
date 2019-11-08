import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { LoginInfo } from '../../../models/login/loginInfo.model';
import { timeout } from 'rxjs/operators';
import { UserModelConnection } from '../../../models/login/user-connection.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostesService {

  constructor(private http: HttpClient,
    private router: Router
  ) { }
  getAll() {
    return this.http.get(environment.API_URL + "postes");
  }
  getPoste(posteId){
    return this.http.get(environment.API_URL + "postes/" + posteId);
  }
  updatePoste(poste){
    return this.http.post(environment.API_URL + "postes/Update", poste);
  }
  addPoste(poste){
    return this.http.post(environment.API_URL + "postes", poste);
  }
}
