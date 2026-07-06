import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  
  averagePrice = 0;
  
  mostExpensiveBook: any = null;
  cheapestBook: any = null;

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

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
         // Average price

         if (books.length > 0) {

          this.averagePrice =
           books.reduce((sum, book) => sum + Number(book.price), 0) /
           books.length;

         }

         // Most expensive

         this.mostExpensiveBook = books.reduce((max, book) =>
         Number(book.price) > Number(max.price) ? book : max
         );

         // Cheapest

         this.cheapestBook = books.reduce((min, book) =>
         Number(book.price) < Number(min.price) ? book : min
         );
        this.cdr.detectChanges();
      },

      

      error: err => console.log(err)

    });

  }

}