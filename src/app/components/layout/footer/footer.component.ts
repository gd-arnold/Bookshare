import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor
  (private userService: UserService,
    private bookService: BookService) { }

  ngOnInit() {
  }

  sendMessageFormHandler(data) {
    this.userService.sendMessage(data);
  }

  suggestBookFormHandler(data) {
    this.bookService.suggestBook(data);
  }

}
