import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {

  books: any[] = [];
  searchText = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => console.error(err)
    });
  }

  deleteBook(id: string): void {

    if (confirm('Delete this book?')) {

      this.bookService.deleteBook(id).subscribe({

        next: () => {

          this.loadBooks();

        },

        error: (err) => console.error(err)

      });

      

    }

  }

  filteredBooks() {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}