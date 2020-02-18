import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserData } from 'src/app/components/shared/interfaces/register-user-data';
import { Router } from '@angular/router';
import { LoginUserData } from 'src/app/components/shared/interfaces/login-user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isAuth() {
    if (localStorage.getItem("token")) {
      return true;
    } return false;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  registerUser(userData: RegisterUserData) {
    this.http.post<RegisterUserData>("https://bookshare-rest-api.herokuapp.com/register", userData).subscribe(() => {
      this.router.navigate(['/auth/login']);
    })
  }

  loginUser(userData: LoginUserData) {
    userData.grant_type = "password";
    userData.client_id = "2_4";
    userData.client_secret = "4";

    this.http.post("https://bookshare-rest-api.herokuapp.com/oauth/v2/token", userData)._trySubscribe((credentials) => {
      localStorage.setItem("token", credentials['access_token']);
      this.router.navigate(['/']);
    }).console.error();
    
  };

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
