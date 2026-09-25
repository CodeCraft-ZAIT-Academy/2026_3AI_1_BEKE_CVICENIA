import { Component, input } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();
  showDetails: boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
