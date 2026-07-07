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
  lowStockBooks: any[] = [];

  genreCounts: { genre: string; count: number }[] = [];

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
          (sum, book) => sum + Number(book.price) * Number(book.stock),
          0
        );
  
        // Count unique genres
        const genreSet = new Set<string>();
  
        books.forEach(book => {
          if (Array.isArray(book.genre)) {
            book.genre.forEach((g: string) => genreSet.add(g));
          } else if (book.genre) {
            genreSet.add(book.genre);
          }
        });
  
        this.totalGenres = genreSet.size;
  
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
  
        // Books by genre
        const genreMap = new Map<string, number>();
  
        books.forEach(book => {
          if (Array.isArray(book.genre)) {
            book.genre.forEach((genre: string) => {
              genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
            });
          } else if (book.genre) {
            genreMap.set(book.genre, (genreMap.get(book.genre) || 0) + 1);
          }
        });
  
        this.genreCounts = Array.from(genreMap.entries())
          .map(([genre, count]) => ({ genre, count }))
          .sort((a, b) => b.count - a.count);
  
        // Low stock books
        this.lowStockBooks = books
          .filter(book => Number(book.stock) < 5)
          .sort((a, b) => Number(a.stock) - Number(b.stock));
  
        console.log(this.lowStockBooks);
  
        this.cdr.detectChanges();
      },
  
      error: err => {
        console.error(err);
      }
  
    });
  
  }
}