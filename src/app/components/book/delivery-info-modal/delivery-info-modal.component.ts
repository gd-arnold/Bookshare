import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { IUser } from '../../shared/interfaces/user';
declare var $: any;

@Component({
  selector: 'app-delivery-info-modal',
  templateUrl: './delivery-info-modal.component.html',
  styleUrls: ['./delivery-info-modal.component.css']
})
export class DeliveryInfoModalComponent implements OnInit {

  @Input() currentUserData: IUser;
  @Input() requestId: string;
  @Input() bookId: string;

  courierId: string;
  cityId: string;
  searchedCities: any[];

  get courierServices() { return this.userService.courierServices; }
  get cities() { return this.userService.cities; }
  get addresses() { return this.userService.addresses }

  constructor(
    private router: Router,
    private userService: UserService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.userService.fetchCourierServices();
    this.courierId = null;
    this.cityId = null;
  }

  fetchCitiesByCourier(id: string) {
    if (this.courierId !== null) {
      this.courierId = id;
      this.cityId = null;
      (document.getElementsByClassName("search-town-engine")[0] as HTMLInputElement).value = "";
    } else {
      this.courierId = id;
    }

    this.searchedCities = [];
    this.userService.fetchCitiesByCourierId(id);
  }

  searchCity(event) {
    if (this.cityId !== null) {
      this.cityId = null;
    }
    let cityName = event.target.value.toLowerCase();
    if (cityName.length > 1) {
      this.searchedCities = this.cities.filter(deliveryInfo => deliveryInfo["city"]["cityName"].toLowerCase().startsWith(cityName));
    } else if (cityName.length === 0) {
      this.searchedCities = [];
    }
  }

  selectCity(name: string, id: string) {
    (document.getElementsByClassName("search-town-engine")[0] as HTMLInputElement).value = name;
    this.searchedCities = [];
    this.cityId = id;
    this.userService.fetchAddressesByCourierIdAndCityId(this.courierId, this.cityId);
  }

  isAddressInvalid() {
    return !(this.addresses && this.addresses.length > 0
      && this.addresses.some(address => address["address"] === (document.getElementsByName("address")[0] as HTMLInputElement).value));
  }

  requestBook(data) {
    const addressId = this.addresses.filter(address => address.address === data.address)[0].id;
    this.bookService.requestBook(this.bookId);
    this.userService.addDeliveryInfo(addressId, data.phoneNumber);
    $(`#m${this.bookId}`).modal('hide');
  }

  chooseBook() {
    this.bookService.chooseBook(this.requestId, this.bookId);
    this.router.navigate([`book/info/request/${this.requestId}`]);
  }

}
