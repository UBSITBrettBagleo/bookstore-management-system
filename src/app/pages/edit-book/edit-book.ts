import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css'
})
export class EditBook implements OnInit {

  id = '';

  book: any = {
    title: '',
    author: '',
    genre: '',
    price: 0,
    stock: 0,
    coverImage: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.bookService.getBook(this.id).subscribe({
      next: (data) => {
        this.book = data;
        if (Array.isArray(this.book.genre)) {
          this.book.genre = this.book.genre.join(', ');
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  updateBook() {

    const bookToUpdate = {
      ...this.book,
      genre: Array.isArray(this.book.genre)
        ? this.book.genre
        : this.book.genre
            .split(',')
            .map((g: string) => g.trim())
            .filter((g: string) => g !== '')
    };
  
    this.bookService.updateBook(this.id, bookToUpdate).subscribe({
      next: () => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      },
      error: (err) => console.error(err)
    });
  
  }
}