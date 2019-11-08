import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { Application } from '../../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class AppConnectionService {

  constructor(private http: HttpClient) { }

  getConnectedApps(usermail: string) {
    return this.http.get(env.API_URL + "Apps/Get", { 'headers': { 'usermail': usermail } });
  }
}
