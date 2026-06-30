import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(this.apiUrl);
  }

  getBook(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addBook(book: any) {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: string, book: any) {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}