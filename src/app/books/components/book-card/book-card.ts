import { Component, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../book';
import { BookDetail } from '../book-detail/book-detail';
import { BookForm } from '../book-form/book-form';
import { getGenreColor } from '../../genre-colors';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail, BookForm],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();

  borrowed = output<void>();
  returned = output<void>();
  favoriteToggled = output<void>();
  edited = output<Book>();
  deleted = output<void>();

  readonly showDetails = signal(false);
  readonly editing = signal(false);
  readonly confirmingDelete = signal(false);

  toggleDetails(): void {
    this.showDetails.update(open => !open);
  }

  toggleFavorite(): void {
    this.favoriteToggled.emit();
  }

  borrow(): void {
    this.borrowed.emit();
  }

  giveBack(): void {
    this.returned.emit();
  }

  startEdit(): void {
    this.editing.set(true);
  }

  saveEdit(book: Book): void {
    this.edited.emit(book);
    this.editing.set(false);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  askDelete(): void {
    this.confirmingDelete.set(true);
  }

  cancelDelete(): void {
    this.confirmingDelete.set(false);
  }

  confirmDelete(): void {
    this.deleted.emit();
  }

  genreColor(): string {
    return getGenreColor(this.book().genre);
  }
}
