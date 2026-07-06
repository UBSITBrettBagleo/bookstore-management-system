import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  selectedGenre = 'All';
  genres: string[] = [];

  selectedAuthor = 'All';
  authors: string[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {

    console.log('loadBooks() called');

    this.bookService.getBooks().subscribe({

      next: (books) => {

        this.books = books;

        // Build genre list
        const genreSet = new Set<string>();

        this.books.forEach(book => {

          if (Array.isArray(book.genre)) {

            book.genre.forEach((g: string) => genreSet.add(g));

          } else if (book.genre) {

            genreSet.add(book.genre);

          }

        });

        this.genres = ['All', ...Array.from(genreSet).sort()];

        // Build author list
        const authorSet = new Set<string>();

        this.books.forEach(book => {

          if (book.author) {

            authorSet.add(book.author);

          }

        });

        this.authors = ['All', ...Array.from(authorSet).sort()];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

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

    return this.books.filter(book => {

      // Search by title
      const matchesSearch =
        book.title.toLowerCase().includes(this.searchText.toLowerCase());

      // Filter by genre
      let matchesGenre = true;

      if (this.selectedGenre !== 'All') {

        if (Array.isArray(book.genre)) {

          matchesGenre = book.genre.includes(this.selectedGenre);

        } else {

          matchesGenre = book.genre === this.selectedGenre;

        }

      }

      // Filter by author
      const matchesAuthor =
        this.selectedAuthor === 'All' ||
        book.author === this.selectedAuthor;

      return matchesSearch && matchesGenre && matchesAuthor;

    });

  }

}