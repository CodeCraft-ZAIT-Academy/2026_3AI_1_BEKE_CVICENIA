import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { BookService } from './book.service';

describe('BookService', () => {
  const books: Book[] = [
    { id: 1, title: 'Hobit', author: 'J. R. R. Tolkien', year: 1937, available: true, genre: 'Fantasy', rating: 5, pages: 310, favorite: false },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, available: false, genre: 'Dystopia', rating: 5, pages: 328, favorite: false },
    { id: 3, title: 'Malý princ', author: 'Antoine de Saint-Exupéry', year: 1943, available: true, genre: 'Fiction', rating: 4, pages: 96, favorite: false }
  ];

  function createService(): BookService {
    TestBed.configureTestingModule({
      providers: [
        { provide: BookApiService, useValue: { getBooks: () => of(books) } }
      ]
    });
    return TestBed.inject(BookService);
  }

  function favoriteIds(service: BookService): number[] {
    return service.books().filter(book => book.favorite).map(book => book.id);
  }

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(createService()).toBeTruthy();
  });

  it('saves favorite IDs to localStorage after toggleFavorite', () => {
    const service = createService();
    service.toggleFavorite(1);
    service.toggleFavorite(3);
    expect(localStorage.getItem('favoriteBookIds')).toBe('[1,3]');

    service.toggleFavorite(1);
    expect(localStorage.getItem('favoriteBookIds')).toBe('[3]');
  });

  it('removes deleted book from saved favorites', () => {
    const service = createService();
    service.toggleFavorite(2);
    service.deleteBook(2);
    expect(localStorage.getItem('favoriteBookIds')).toBe('[]');
  });

  it('marks saved favorites when books are loaded', () => {
    localStorage.setItem('favoriteBookIds', '[1,3]');
    expect(favoriteIds(createService())).toEqual([1, 3]);
  });

  it('ignores an invalid saved value', () => {
    localStorage.setItem('favoriteBookIds', 'abc');
    expect(favoriteIds(createService())).toEqual([]);
  });
});
