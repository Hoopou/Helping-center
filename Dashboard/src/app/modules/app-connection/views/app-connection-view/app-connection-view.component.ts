import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { AuthService } from '../../../../core/services/api/microsoft-services/auth.service';
import { Application } from '../../../../core/models/application.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-app-connection-view',
  templateUrl: './app-connection-view.component.html',
  styleUrls: ['./app-connection-view.component.scss']
})
export class AppConnectionViewComponent implements OnInit {
  apps: Application[];
  awaitingToSign = false;
  signoutFailed: boolean;
  signinFailed: boolean;
  apiDeconnected: boolean;

  constructor(public authService: AuthService, public api: ApiService, private cookieService: CookieService) {
    this.api.connectedAppsService.getConnectedApps(this.cookieService.get(environment.cookies.emailCookie)).subscribe(
      (data: []) => this.apps = data.map(app => Application.from(app))
    )
  }

  ngOnInit() {

  }

  async signIn(appid: string): Promise<void> {
    if (appid == environment.MicrosoftOAuthSettings.appId) {
      let app = this.apps.find(a => a.Id === appid);
      app.AwaitingToConnect = true;
      this.signinFailed = !await this.authService.signIn().finally(() => {
        app.IsConnected = this.authService.authenticated;
        app.AwaitingToConnect = false;
      });
    }
  }

  async signOut(appid: string): Promise<void> {
    if (appid == environment.MicrosoftOAuthSettings.appId) {
      let app = this.apps.find(a => a.Id === appid);
      app.AwaitingToDeconnect = true;

      this.authService.askApiToLogOut(environment.MicrosoftOAuthSettings.appId).subscribe(
        () => {
          this.authService.signOut();
          app.IsConnected = false;
          this.clearAllDeconnectionPopup();
          app.AwaitingToDeconnect = false;
        },
        (error: any) => {
          this.signoutFailed = true;
          this.clearAllDeconnectionPopup();
          app.AwaitingToDeconnect = false;
        }
      );
    }
  }

  wantsToDeconnect(appid: string) {
    if (this.apps.find(a => a.Id === appid).WaitingToConfirm) {
      this.clearAllDeconnectionPopup();
    } else {
      this.clearAllDeconnectionPopup();
      this.apps.find(a => a.Id === appid).WaitingToConfirm = !this.apps.find(a => a.Id === appid).WaitingToConfirm;
    }
  }

  clearAllDeconnectionPopup() {
    this.apps.forEach(element => {
      element.WaitingToConfirm = false;
    });
  }
}