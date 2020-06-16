import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { IRequest } from 'src/app/components/shared/interfaces/request';
import { AuthService } from './auth.service';
import { ICourierService } from 'src/app/components/shared/interfaces/courier-service';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { IUser } from 'src/app/components/shared/interfaces/user';
import { IMessage } from 'src/app/components/shared/interfaces/message';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    requests: IRequest[];
    unreadNotificationsCountChanged = new Subject<number>();
    requestChanged = new Subject<IRequest>();
    courierServices: ICourierService[];
    cities: any[];
    addresses: any[];
    request: IRequest;
    usersChanged = new Subject<IUser[]>(); 
    messages: IMessage[];

    private _unreadNotificationsCount: number = 0;
    private _unreadNotificationsCountSubscriptions: Subscription[] = [];
    private _requestSubscriptions: Subscription[] = [];
    private _usersSubscription: Subscription[] = [];

    isPasswordChanged: boolean = false;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

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
            }, (err => {
                if(err.statusText === "Unauthorized") {
                    this.authService.logoutUser();
                }
            }))
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
            this.request = request;
            this.requestChanged.next(this.request);
        });
    }

    fetchRequestInfoById(id: string) {
        this.http.get<IRequest>(`${urlPrivate}/request-info/${id}`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(request => {
            this.request = request;
            this.requestChanged.next(this.request);
            this.router.navigateByUrl(`book/info/request/${id}`);
        });
    }

    fetchCourierServices() {
        this.http.get<ICourierService[]>(`${urlPrivate}/couriers`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(couriers => {
            this.courierServices = couriers;
        })
    }

    fetchCitiesByCourierId(id: string) {
        this.http.get<any[]>(`${urlPrivate}/cities-by-courier/${id}`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(cities => {
            this.cities = cities;
        })
    }

    fetchAddressesByCourierIdAndCityId(courierId: string, cityId: string) {
        let data = {
            cityId: cityId,
            courierId: courierId
        };

        this.http.post<any[]>(`${urlPrivate}/addresses-by-city`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(addresses => {
            this.addresses = addresses;
        })
    }

    addDeliveryInfo(addressId: string, phoneNumber: string) {
        let data = {
            addressId: addressId,
            phoneNumber: phoneNumber
        };

        this.http.post(`${urlPrivate}/add-address`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {  
            this.authService.getCurrentUserBasicData();    
        })
    }

    updateUser(firstName: string, lastName: string, email: string, userId: string) {
        let bodyData = {
            data: {
                "firstName" : firstName,
                "lastName" : lastName,
                "email" : email
            },
            id: userId
        };

        this.http.post(`${urlPrivate}/update-user-basic-data`, bodyData, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
            this.authService.getUserBasicData(this.authService._userData.id)
        }, err => {
            this.authService.getUserBasicData(this.authService._userData.id)
            alert("Вече съществува потребител с такъв имейл!");
        });
    }

    updatePassword(data) {
        this.http.post(`${urlPrivate}/update-password`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
            this.authService.getUserBasicData(this.authService._userData.id)
            this.isPasswordChanged = true;
        }, err=> {
            alert("Невалидна парола!");
        });
    }

    fetchAllUsersBasicData() {
        this.http.get<IUser[]>(`${urlPrivate}/all-users`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(users => {
            this.usersChanged.next(users);
        }, err => {
            alert("Нямате права да достъпвате тази страница!")
        })
    }

    fetchAllMessages() {
        this.http.get<IMessage[]>(`${urlPrivate}/all-messages`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(messages => {
            this.messages = messages;
            console.log(messages);
        }, err => {
            alert("Нямате права да достъпвате тази страница!");
        })
    }

    cancelSubscriptions() {
        this._unreadNotificationsCountSubscriptions.forEach((s) => s.unsubscribe());
        this._requestSubscriptions.forEach((s) => s.unsubscribe());
    }
}