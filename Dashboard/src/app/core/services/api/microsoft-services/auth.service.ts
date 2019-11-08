import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

import { AlertsService } from './alerts.service';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService, private http: HttpClient) {

    this.authenticated = this.msalService.getUser() != null;
    this.getUser().then((user) => { this.user = user });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<boolean> {

    let result = await this.msalService.loginPopup(environment.MicrosoftOAuthSettings.scopes)
      .catch((reason) => {
        this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      await this.pushTokenToApi(environment.MicrosoftOAuthSettings.appId, this.user.token).toPromise().catch(()=>{
        this.authenticated = false;
      });
    }
    return this.authenticated;
  }

  // Sign out
  signOut() {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(environment.MicrosoftOAuthSettings.scopes)
      .catch((reason) => {
        this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    return result;
  }

  async getUser(): Promise<User> {
    if (!this.authenticated) return null;
    let token = null;
    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async (done) => {
        token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          })

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();
    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.userId = graphUser.id;
    user.token = token;
    this.user = user;
    return user;
  }

  pushTokenToApi(appid: string, token: string) {
    let body = {
      appId: appid,
      token
    }
     return this.http.post(environment.API_URL + "apps/MicrosoftLogin", body);
  }

  askApiToLogOut(appid: string): Observable<any>{
    return this.http.post(environment.API_URL + "apps/MicrosoftLogOut", { appId: appid});
  }
}