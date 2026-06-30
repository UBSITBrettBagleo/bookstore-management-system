import { Routes } from '@angular/router';
import { Books } from './pages/books/books';
import { AddBook } from './pages/add-book/add-book';

export const routes: Routes = [
  {
    path: '',
    component: Books
  },
  {
    path: 'add-book',
    component: AddBook
  }
];