import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';
import { genreColor } from '../genre-color';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  // Knihy mení aj BookCard (Vypožičať / Vrátiť) – košík sa musí kontrolovať vždy,
  // inak by si zmenu nevšimol (predvolené OnPush sleduje iba nové inputy).
  changeDetection: ChangeDetectionStrategy.Eager
})
export class Cart {
  books = input.required<Book[]>();

  borrowedBooks(): Book[] {
    return this.books().filter(book => !book.available);
  }

  giveBack(book: Book): void {
    book.available = true;
  }

  giveBackAll(): void {
    for (const book of this.borrowedBooks()) {
      book.available = true;
    }
  }

  genreColor(book: Book): string {
    return genreColor(book.genre);
  }
}
