import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-delivery-info-modal',
  templateUrl: './delivery-info-modal.component.html',
  styleUrls: ['./delivery-info-modal.component.css']
})
export class DeliveryInfoModalComponent implements OnInit {

  courierId: string;
  cityId: string;
  searchedCities: any[];

  get courierServices() { return this.userService.courierServices; }
  get cities() { return this.userService.cities; }
  get addresses() { return this.userService.addresses }
  get bookId() { return this.router.snapshot.paramMap.get('id'); };

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.userService.fetchCourierServices();
    this.courierId = null;
    this.cityId = null;
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
    this.userService.fetchAddressesByCourierIdAndCityId(this.courierId, this.cityId);
  }

  requestBook(data) {
    this.bookService.requestBook(this.bookId);
    this.userService.addDeliveryInfo(data.address, data.phoneNumber);
  }

}
