import { Component } from '@angular/core';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  constructor(private bookService: BookService) {}

  books: any[] = [];

  ngOnInit() {
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data;
    });
  }
}
