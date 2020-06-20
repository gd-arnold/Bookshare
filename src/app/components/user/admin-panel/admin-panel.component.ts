import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/services/book.service';
import { ISubcategory } from '../../shared/interfaces/subcategory';
declare var $: any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: IUser[];
  usersDataSub: Subscription;

  searchedUsers: IUser[];
  subcategoriesFetched: boolean;
  subcategory: ISubcategory;

  get bookSuggestions() { return this.bookService.bookSuggestions; }
  get messages() { return this.userService.messages; }
  get categories() { return this.bookService.categories; }
  get subcategories() { return this.bookService.subcategories; }

  constructor(private userService: UserService,
              private bookService: BookService) { }

  ngOnInit() {
    this.userService.fetchAllUsersBasicData();
    this.bookService.fetchAllSuggestions();
    this.userService.fetchAllMessages();
    this.bookService.fetchAllCategories();
    this.searchedUsers = this.users;
    this.usersDataSub = this.userService.usersChanged.subscribe((users) => {
      this.users = users;
      this.searchedUsers = users;
    })
  }

  searchUser(event) {
    let searchedName = event.target.value.toLowerCase();
    
    this.searchedUsers = this.users.filter(user => this.getFullName(user).toLowerCase().indexOf(searchedName) !== -1);
  } 

  getFullName(user) {
    return user["firstName"] + " " + user["lastName"];
  }

  deleteMessage(messageId: string) {
    this.userService.deleteMessage(messageId);
  }

  selectCategory(categoryName: string) {
    $(`#subcategoryField`).val('');
    this.subcategoriesFetched = false;
    if (this.categories.filter(category => category.categoryName === categoryName).length > 0) {
      const categoryId = this.categories.filter(category => category.categoryName === categoryName)[0].id;
      this.bookService.fetchSubcategoriesByCategory(categoryId);
      this.subcategoriesFetched = true;
    }
  }

  selectSubcategory(subcategoryName: string) {
    this.subcategory = this.subcategories.filter(subcategory => subcategory.subcategoryName === subcategoryName)[0];
  }

  addBook(data, suggestionId) {
    data["subcategoryId"] = this.subcategory.id;
    data["suggestionId"] = suggestionId;
    this.bookService.createBook(data);
  }

}
