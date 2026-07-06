import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {

  book = {
    title: '',
    author: '',
    genre: '',
    price: 0,
    stock: 0,
    coverImage: '',
    description: ''
  };

  constructor(
    private bookService: BookService,
    private router: Router
) {}

addBook() {

  const bookToSave = {
    ...this.book,
    genre: this.book.genre
      .split(',')
      .map(g => g.trim())
      .filter(g => g !== '')
  };

  this.bookService.addBook(bookToSave).subscribe({
      next: () => {

        alert('Book added successfully!');
      
        this.router.navigate(['/']);
      
      },
      error: (err) => {
        console.log(err);
        alert('Failed to add book.');
      }
    });
  }

}