import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { environment as env } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoggingIn: boolean = false;
  wantstologin:boolean = false;
  loginaccueil: boolean = true;
  customlogin: boolean = false;
  notificationMessage: any;

  url:string = "";

  constructor(private api: ApiService,
    private router: Router
  ) {
  
  }

  ngOnInit() {
    this.api.notificationService.getPermission();
    this.api.notificationService.receiveMessage();
    this.notificationMessage = this.api.notificationService.currentMessage;
    this.url = this.router.url;
  }


  Microsoftlogin(){

  }

  organizationlogin(){
    this.customlogin = true;
    this.wantstologin = false;
  }
}