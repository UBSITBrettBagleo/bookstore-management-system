import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalBooks = 0;
  totalStock = 0;
  inventoryValue = 0;
  totalGenres = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {

    this.bookService.getBooks().subscribe({

      next: (books: any[]) => {

        this.totalBooks = books.length;

        this.totalStock = books.reduce(
          (sum, book) => sum + Number(book.stock),
          0
        );

        this.inventoryValue = books.reduce(
          (sum, book) => sum + (Number(book.price) * Number(book.stock)),
          0
        );

        const genres = new Set(
          books.map(book => book.genre)
        );

        this.totalGenres = genres.size;

      },

      error: err => console.log(err)

    });

  }

}