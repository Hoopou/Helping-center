import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ApiService } from '../../core/services/api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private api: ApiService,
    private cookieService: CookieService,
    @Inject(DOCUMENT) _document?: any,
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  currentUser(): string {

    if (!localStorage.getItem(environment.cookies.emailCookie) || !localStorage.getItem(environment.cookies.usernameCookie)) {
      return null;
    }

    return (localStorage.getItem(environment.cookies.usernameCookie) + " - " + localStorage.getItem(environment.cookies.emailCookie));
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.api.loginService.logout();
  }

  logs(){
    window.open(environment.API_URL+"dev/logs", "_blank");
  }
}
