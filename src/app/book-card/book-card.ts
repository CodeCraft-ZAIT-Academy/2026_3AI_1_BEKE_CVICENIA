import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';
import { BookDetail } from '../book-detail/book-detail';
import { genreColor } from '../genre-color';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
  // Knihu môže vrátiť aj košík – karta sa musí kontrolovať vždy,
  // inak by ostala sivá (predvolené OnPush sleduje iba nové inputy).
  changeDetection: ChangeDetectionStrategy.Eager
})
export class BookCard {
  book = input.required<Book>();
  showDetails: boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  toggleFavorite(): void {
    this.book().favorite = !this.book().favorite;
  }

  borrow(): void {
    this.book().available = false;
  }

  giveBack(): void {
    this.book().available = true;
  }

  genreColor(): string {
    return genreColor(this.book().genre);
  }
}
