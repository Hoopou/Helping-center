import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-login-method',
  templateUrl: './users-login-method.component.html',
  styleUrls: ['./users-login-method.component.scss']
})
export class UsersLoginMethodComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  customlogin(){
    this.router.navigate(["/login/users/custom"]);
  }

  Microsoftlogin(){
    
  }
}
