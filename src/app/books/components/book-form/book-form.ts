import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../book';
import { GENRES } from '../../genres';
import { createEmptyBook } from '../../book.factory';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  // Bez knihy = režim „pridať“, s knihou = režim „upraviť“.
  book = input<Book>();
  saved = output<Book>();
  cancelled = output<void>();

  genres: string[] = GENRES;
  ratings: number[] = [1, 2, 3, 4, 5];
  currentYear: number = new Date().getFullYear();

  draft: Book = createEmptyBook();

  ngOnInit(): void {
    const book = this.book();
    if (book) {
      // Kópia – formulár mení iba koncept, originál sa nahradí až po uložení.
      this.draft = { ...book };
    }
  }

  isEditMode(): boolean {
    return this.book() !== undefined;
  }

  save(form: NgForm): void {
    this.saved.emit({ ...this.draft });

    // Pri úprave formulár zatvorí karta, pri pridaní ho vyčistíme.
    if (!this.isEditMode()) {
      this.draft = createEmptyBook();
      form.resetForm(this.draft);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
