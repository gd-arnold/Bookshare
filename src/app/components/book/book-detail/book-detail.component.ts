import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  currentUserData: IUser;
  currentUserDataSub: Subscription;
  courierId: string;
  cityId: string;
  searchedCities: any[];

  get book() { return this.bookService.book; }
  get courierServices() { return this.userService.courierServices; }
  get cities() { return this.userService.cities; }
  get addresses() { return this.userService.addresses }

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    let bookId = this.router.snapshot.paramMap.get('id');
    this.bookService.fetchBookById(bookId);
    this.userService.fetchCourierServices();
    this.courierId = null;
    this.cityId = null;
    if (this.authService.isAuth) {
      this.authService.getCurrentUserBasicData();
      this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
        this.currentUserData = user;
      })
    }
  }

  isOwner() {
    return this.book.users.some(user => user["id"] === this.currentUserData.id)
  }

  isRequested() {
    return this.currentUserData.requests.some(request => request["requestedBook"]["id"] === this.book.id);
  }

  requestBook(data) {
    // this.bookService.requestBook(this.book);
    // this.userService.addDeliveryInfo(data.address, data.phoneNumber);
  }

  fetchCitiesByCourier(id: string) {
    this.courierId = id;
    this.searchedCities = [];
    this.userService.fetchCitiesByCourierId(id);
  }

  searchCity(event) {
    let cityName = event.target.value.toLowerCase();
    if (cityName.length > 1) {
      this.searchedCities = this.cities.filter(deliveryInfo => deliveryInfo["city"]["cityName"].toLowerCase().startsWith(cityName));
    } else if (cityName.length === 0) {
      this.searchedCities = [];
    }
  }

  selectCity(name: string, id: string) {
    (document.getElementById("town") as HTMLInputElement).value = name;
    this.searchedCities = [];
    this.cityId = id;
    this.fetchAddressesByCourierIdAndCityId(this.courierId, this.cityId); 
  }

  fetchAddressesByCourierIdAndCityId(courierId: string, cityId: string) {
    this.userService.fetchAddressesByCourierIdAndCityId(courierId, cityId);
  }

  ngOnDestroy() {
    if (this.authService.isAuth) {
      this.currentUserDataSub.unsubscribe();
      this.authService.cancelSubscriptions();
    }
  }

}