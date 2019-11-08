import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api/api.service';
import { LoginInfo } from '../../../../core/models/login/loginInfo.model';
import { alertMsg } from '../../../../core/models/alert.model';
import { UserModelConnection } from '../../../../core/models/login/user-connection.model';

@Component({
  selector: 'users-custom-login',
  templateUrl: './users-custom-login.component.html',
  styleUrls: ['./users-custom-login.component.scss']
})
export class UsersCustomLoginComponent implements OnInit {

  constructor(private api: ApiService, private router:Router) { }

  user: LoginInfo = LoginInfo.empty();
  error: alertMsg[] = [];
  islogging = false;
  
  ngOnInit() {
  }

  login(){
    this.islogging = true;
    this.api.loginService.canlogin(this.user).subscribe(
      (user: UserModelConnection) => {
        this.api.loginService.addCookies(user);
        this.router.navigate(['/formations'])
        this.islogging = false;
      },
      () => {
        this.error.push(new alertMsg("Error", "Failed to authenticate"))
        this.islogging = false;
      }
    )
  }

}
