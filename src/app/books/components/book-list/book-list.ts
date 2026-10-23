import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BookCard } from '../book-card/book-card';
import { BookForm } from '../book-form/book-form';
import { Cart } from '../../../cart/components/cart/cart';
import { Book } from '../../book';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-list',
  imports: [
    BookCard,
    BookForm,
    Cart,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);

  readonly books = this.bookService.books;
  readonly borrowedBooks = this.bookService.borrowedBooks;
  readonly availableBooks = this.bookService.availableBooks;
  readonly maxBorrowed = this.bookService.maxBorrowed;

  readonly totalBooks = computed(() => this.books().length);

  readonly searchText = signal('');
  readonly availability = signal('all');
  readonly sortBy = signal('none');
  readonly favoritesOnly = signal(false);

  readonly visibleBooks = computed(() => {
    const list = this.bookService.getFilteredBooks(
      this.searchText(),
      this.availability(),
      this.sortBy()
    );
    return this.favoritesOnly() ? list.filter(book => book.favorite) : list;
  });

  readonly currentPage = signal(1);
  readonly pageSize = signal(6);

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize()))
  );

  readonly firstShown = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);

  readonly lastShown = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.visibleBooks().length)
  );

  readonly pagedBooks = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.visibleBooks().slice(start, start + this.pageSize());
  });

  clearSearch(): void {
    this.searchText.set('');
    this.firstPage();
  }

  toggleFavoritesOnly(): void {
    this.favoritesOnly.update(only => !only);
    this.firstPage();
  }

  resetFilters(): void {
    this.searchText.set('');
    this.availability.set('all');
    this.sortBy.set('none');
    this.favoritesOnly.set(false);
    this.firstPage();
  }

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.firstPage();
  }

  updateBook(updated: Book): void {
    this.bookService.updateBook(updated);
  }

  deleteBook(deleted: Book): void {
    this.bookService.deleteBook(deleted.id);

    if (this.currentPage() > this.pageCount()) {
      this.lastPage();
    }
  }

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert('Knihu teraz nie je možné vypožičať. Skontroluj dostupnosť a limit výpožičiek.');
    }
  }

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
  }

  giveBackAll(): void {
    for (const book of this.borrowedBooks()) {
      this.bookService.returnBook(book.id);
    }
  }

  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id);
  }

  previousPage(): void {
    this.currentPage.update(page => Math.max(1, page - 1));
  }

  nextPage(): void {
    this.currentPage.update(page => Math.min(this.pageCount(), page + 1));
  }

  firstPage(): void {
    this.currentPage.set(1);
  }

  lastPage(): void {
    this.currentPage.set(this.pageCount());
  }
}
