import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Books } from './pages/books/books';
import { AddBook } from './pages/add-book/add-book';
import { EditBook } from './pages/edit-book/edit-book';
import { About } from './pages/about/about';
import { Help } from './pages/help/help';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'dashboard',
    component: Dashboard
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

  {
    path: 'about',
    component: About
  },

  {
    path: 'help',
    component: Help
  }

];