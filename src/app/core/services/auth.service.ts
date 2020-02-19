import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserData } from 'src/app/components/shared/interfaces/register-user-data';
import { Router } from '@angular/router';
import { LoginUserData } from 'src/app/components/shared/interfaces/login-user-data';

const url = "https://bookshare-rest-api.herokuapp.com";

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
    this.http.post<RegisterUserData>(`${url}/register`, userData).subscribe(() => {
      this.router.navigate(['/auth/login']);
    })
  }

  loginUser(userData: LoginUserData) {
    userData.grant_type = "password";
    userData.client_id = "2_4";
    userData.client_secret = "4";

    this.http.post<LoginUserData>(`${url}/oauth/v2/token`, userData).subscribe((credentials) => {
      localStorage.setItem("token", credentials['access_token']);
      this.router.navigate(['/']);
    })
  };

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
