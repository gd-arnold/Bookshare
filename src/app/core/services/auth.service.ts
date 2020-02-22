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

  currentUser: IUser;
  currentUserChanged = new Subject<IUser>();

  private _userSubscriptions: Subscription[] = [];
  private _userData: IUser; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isAuth() {
    if (localStorage.getItem("token")) {
      return true;
    } return false;
  }

  getHttpOptions(token) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

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
    }, err => alert("Невалидни данни."));
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
