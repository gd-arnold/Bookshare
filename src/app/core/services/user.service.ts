import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { IRequest } from 'src/app/components/shared/interfaces/request';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    requests: IRequest[];
    unreadNotificationsCountChanged = new Subject<number>();
    requestChanged = new Subject<IRequest>();

    private _unreadNotificationsCount: number = 0;
    private _unreadNotificationsCountSubscriptions: Subscription[] = [];
    private _request: IRequest;
    private _requestSubscriptions: Subscription[] = [];

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
                this._unreadNotificationsCount = parseInt(count.toString());
                this.unreadNotificationsCountChanged.next(this._unreadNotificationsCount);
            })
    }

    fetchNotificationsForCurrentUser() {
        this.http.get<IRequest[]>(`${urlPrivate}/all-requests`, this.getHttpOptions(localStorage.getItem("token")))
            .subscribe((requests) => {
                this.requests = requests;
            })
    }

    readUnreadNotificationsforCurrentUser() {
        this.http.get(`${urlPrivate}/read-unread-requests`, this.getHttpOptions(localStorage.getItem("token")))
            .subscribe()
    }

    fetchRequestById(id: string) {
        this.http.get<IRequest>(`${urlPrivate}/request/${id}`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(request => {
            this._request = request;
            this.requestChanged.next(this._request);
        });
    }

    fetchRequestInfoById(id: string) {
        this.http.get<IRequest>(`${urlPrivate}/request-info/${id}`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(request => {
            this._request = request;
            this.requestChanged.next(this._request);
        });
    }

    cancelSubscriptions() {
        this._unreadNotificationsCountSubscriptions.forEach((s) => s.unsubscribe());
        this._requestSubscriptions.forEach((s) => s.unsubscribe());
    }
}