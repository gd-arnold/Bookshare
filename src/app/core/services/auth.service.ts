import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUserData } from 'src/app/components/shared/interfaces/register-user-data';
import { Router } from '@angular/router';
import { LoginUserData } from 'src/app/components/shared/interfaces/login-user-data';
import { BookService } from './book.service';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/components/shared/interfaces/user';
import { Subject, Subscription } from 'rxjs';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userSubscriptions: Subscription[] = [];
  _userData: IUser; 

  currentUser: IUser;
  currentUserChanged = new Subject<IUser>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isAuth() {
    return localStorage.getItem("token") ? true : false;
  }

  getHttpOptions(token) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  registerUser(userData: RegisterUserData, loginUser: LoginUserData) {
    this.http.post<RegisterUserData>(`${url}/register`, userData).subscribe(() => {
  
      loginUser.username = userData.email;
      loginUser.password = userData.password;
      loginUser.grant_type = "password";
      loginUser.client_id = "2_4";
      loginUser.client_secret = "4";
  
      this.http.post<LoginUserData>(`${url}/oauth/v2/token`, userData).subscribe((credentials) => {
        localStorage.setItem("token", credentials['access_token']);
        this.router.navigate(['book/register/add']);
      }, err => console.log(err));

    }, err => alert("Вече има потребител с такъв имейл!"))
  }

  loginUser(userData: LoginUserData) {
    userData.grant_type = "password";
    userData.client_id = "2_4";
    userData.client_secret = "4";

    this.http.post<LoginUserData>(`${url}/oauth/v2/token`, userData).subscribe((credentials) => {
      localStorage.setItem("token", credentials['access_token']);
      this.router.navigate(['/']);
    }, err => alert("Невалидни данни!"));
  };

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  getCurrentUserBasicData() {
    this.http.get<IUser>(`${urlPrivate}/current-user-basic-data`, this.getHttpOptions(localStorage.getItem('token'))).subscribe((user) => {
      this._userData = user;
      this.currentUserChanged.next(this._userData);
    });
  }
  
  cancelSubscriptions() {
    this._userSubscriptions.forEach((s) => s.unsubscribe());
  }
}
