import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './core/services/api/api.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.api.loginService.testAuth().subscribe(
      () => {
      },
      () => {
        this.router.navigate(['/login']);
      }
    );

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });    
  }
}
