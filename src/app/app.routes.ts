import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { AddBook } from './pages/add-book/add-book';
import { EditBook } from './pages/edit-book/edit-book';


export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'books',
    component: Books
  },

  {
    path: 'add-book',
    component: AddBook
  },

  {
    path: 'edit-book/:id',
    component: EditBook
  },




];