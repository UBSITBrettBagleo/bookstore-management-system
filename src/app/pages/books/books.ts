import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
