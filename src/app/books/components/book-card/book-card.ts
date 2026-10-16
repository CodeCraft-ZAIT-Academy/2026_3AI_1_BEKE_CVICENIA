import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../book';
import { BookDetail } from '../book-detail/book-detail';
import { BookForm } from '../book-form/book-form';
import { genreColor } from '../../genre-color';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail, BookForm],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
  // Knihu môže vrátiť aj košík – karta sa musí kontrolovať vždy,
  // inak by ostala sivá (predvolené OnPush sleduje iba nové inputy).
  changeDetection: ChangeDetectionStrategy.Eager
})
export class BookCard {
  book = input.required<Book>();

  // Požičanie povolí až BookList – ten pozná limit výpožičiek.
  borrowed = output<void>();
  edited = output<Book>();
  deleted = output<void>();

  showDetails: boolean = false;
  editing: boolean = false;
  confirmingDelete: boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  toggleFavorite(): void {
    this.book().favorite = !this.book().favorite;
  }

  borrow(): void {
    this.borrowed.emit();
  }

  giveBack(): void {
    this.book().available = true;
  }

  startEdit(): void {
    this.editing = true;
  }

  saveEdit(book: Book): void {
    this.edited.emit(book);
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  askDelete(): void {
    this.confirmingDelete = true;
  }

  cancelDelete(): void {
    this.confirmingDelete = false;
  }

  confirmDelete(): void {
    this.deleted.emit();
  }

  genreColor(): string {
    return genreColor(this.book().genre);
  }
}
