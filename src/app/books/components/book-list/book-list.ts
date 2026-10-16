import { Component, inject } from '@angular/core';
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

  maxBorrowed: number = this.bookService.maxBorrowed;
  books: Book[] = this.bookService.getBooks();

  searchText: string = '';
  availability: string = 'all';
  sortBy: string = 'none';

  currentPage: number = 1;
  pageSize: number = 6;

  visibleBooks(): Book[] {
    return this.bookService.getFilteredBooks(this.searchText, this.availability, this.sortBy);
  }

  clearSearch(): void {
    this.searchText = '';
    this.firstPage();
  }

  refreshBooks(): void {
    this.books = this.bookService.getBooks();
  }

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.refreshBooks();
    this.firstPage();
  }

  updateBook(updated: Book): void {
    this.bookService.updateBook(updated);
    this.refreshBooks();
  }

  deleteBook(deleted: Book): void {
    this.bookService.deleteBook(deleted.id);
    this.refreshBooks();

    if (this.currentPage > this.pageCount()) {
      this.lastPage();
    }
  }

  borrowedBooks(): Book[] {
    return this.bookService.borrowedBooks();
  }

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert('Knihu teraz nie je možné vypožičať. Skontroluj dostupnosť a limit výpožičiek.');
      return;
    }

    this.refreshBooks();
  }

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
    this.refreshBooks();
  }

  giveBackAll(): void {
    for (const book of this.borrowedBooks()) {
      this.bookService.returnBook(book.id);
    }
    this.refreshBooks();
  }

  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id);
    this.refreshBooks();
  }

  pageCount(): number {
    return Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize));
  }

  isOnCurrentPage(index: number): boolean {
    const start = (this.currentPage - 1) * this.pageSize;
    return index >= start && index < start + this.pageSize;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount()) {
      this.currentPage++;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.pageCount();
  }

  firstShown(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  lastShown(): number {
    return Math.min(this.currentPage * this.pageSize, this.visibleBooks().length);
  }
}
