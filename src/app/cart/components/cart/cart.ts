import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../../books/book';
import { getGenreColor } from '../../../books/genre-colors';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  books = input.required<Book[]>();

  returned = output<Book>();
  returnedAll = output<void>();

  borrowedBooks(): Book[] {
    return this.books().filter(book => !book.available);
  }

  giveBack(book: Book): void {
    this.returned.emit(book);
  }

  giveBackAll(): void {
    this.returnedAll.emit();
  }

  genreColor(book: Book): string {
    return getGenreColor(book.genre);
  }
}
