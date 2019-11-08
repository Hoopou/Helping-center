import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { LoginInfo } from '../../../models/login/loginInfo.model';
import { timeout } from 'rxjs/operators';
import { UserModelConnection } from '../../../models/login/user-connection.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient,
        private router: Router
    ) { }

    getRedirectUrl(askForContent: boolean) {
        // Preserve cookies (this is needed because cookie auth, you know?)
        return this.http.get(env.API_URL + "auth/GetZohoLoginUrl?askForContent=" + askForContent,
            { observe: 'response', withCredentials: true });
    }

    logout(forcelogout: boolean = false) {

        let callLogout: boolean = false;

        let guid = localStorage.getItem("id");
        if (guid) {
            console.log("deleting id cookie");
            localStorage.removeItem('id');
            callLogout = true;
        }
        localStorage.getItem
        let email = localStorage.getItem('email');
        if (email) {
            localStorage.removeItem('email');
            callLogout = true;
        }

        let token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
            callLogout = true;
        }

        let username = localStorage.getItem('username');
        if (username) {
            localStorage.removeItem('username');
            callLogout = true;
        }



        if (callLogout || forcelogout) {
            this.http.get(env.API_URL + "auth/logout", { observe: 'response', withCredentials: false}).subscribe(
                () => {}
            );
        }
        
        this.router.navigate(['/login'])
    }

    private deleteCookie(name: string) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    getCookie(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    addCookies(user: UserModelConnection){
        localStorage.setItem("id", user.id.toString());
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", user.token);
        localStorage.setItem("username", user.username);
    }

    testAuth() {
        return this.http.get(env.API_URL + "auth/TestAuth").pipe(timeout(1000));
    }

    continueLoginWithCode(code: string) {
        return this.http.get(env.API_URL + "auth?code=" + code);
    }

    canlogin(info:LoginInfo){
        console.log("Logging to: " + env.API_URL + "auth/login" );
        return this.http.post(env.API_URL + "auth/login" , info);
    }

    addUser(user:LoginInfo){
        return this.http.post(env.API_URL + "users", user);
    }

    getUser(){
        return this.http.get(env.API_URL + "users");
    }

    updateUser(user:LoginInfo){
        return this.http.post(env.API_URL + "users/update", user);
    }
}
