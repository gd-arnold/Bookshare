import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
    providedIn: 'root'
})
export class UserService {


    unreadNotificationsCountChanged = new Subject<string>();

    private _unreadNotificationsCount: string = "0";
    private _unreadNotificationsCountSubscriptions: Subscription[] = [];

    constructor(private http: HttpClient) { }

    getHttpOptions(token) {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
    }

    fetchUnreadNotificationsCount() {
        this.http.get(`${urlPrivate}/unread-requests-count`, this.getHttpOptions(localStorage.getItem("token")))
            .subscribe((count) => {
                this._unreadNotificationsCount = count.toString();
                this.unreadNotificationsCountChanged.next(this._unreadNotificationsCount);
            })
    }

    cancelSubscriptions() {
        this._unreadNotificationsCountSubscriptions.forEach((s) => s.unsubscribe());
    }
}