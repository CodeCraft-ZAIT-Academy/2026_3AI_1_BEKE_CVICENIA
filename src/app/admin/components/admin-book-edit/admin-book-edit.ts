import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookForm } from '../../../books/components/book-form/book-form';
import { Book } from '../../../books/book';
import { BookService } from '../../../books/book.service';

@Component({
  selector: 'app-admin-book-edit',
  imports: [RouterLink, MatButtonModule, MatIconModule, BookForm],
  templateUrl: './admin-book-edit.html',
  styleUrl: './admin-book-edit.css'
})
export class AdminBookEdit {
  private router = inject(Router);
  private bookService = inject(BookService);

  readonly loading = this.bookService.loading;
  readonly loadError = this.bookService.loadError;

  id = input<string>();

  readonly isEditMode = computed(() => this.id() !== undefined);
  readonly book = computed(() => this.bookService.getBookById(Number(this.id())));

  save(book: Book): void {
    if (this.isEditMode()) {
      this.bookService.updateBook(book);
    } else {
      this.bookService.addBook(book);
    }
    this.router.navigate(['/admin']);
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
