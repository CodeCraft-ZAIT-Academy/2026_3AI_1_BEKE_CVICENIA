import { BookFilterPipe } from './book-filter-pipe';
import { Book } from './book';

describe('BookFilterPipe', () => {
  const books: Book[] = [
    { id: 1, title: 'Hobit', author: 'J. R. R. Tolkien', year: 1937, available: true, genre: 'Fantasy', rating: 5, pages: 310, favorite: true },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, available: false, genre: 'Dystopia', rating: 5, pages: 328, favorite: false },
    { id: 3, title: 'Malý princ', author: 'Antoine de Saint-Exupéry', year: 1943, available: true, genre: 'Fiction', rating: 4, pages: 96, favorite: false }
  ];

  const pipe = new BookFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns all books without arguments', () => {
    expect(pipe.transform(books).length).toBe(3);
  });

  it('searches in title and author, ignoring case and spaces', () => {
    expect(pipe.transform(books, '  HOBIT ').map(b => b.id)).toEqual([1]);
    expect(pipe.transform(books, 'orwell').map(b => b.id)).toEqual([2]);
  });

  it('filters by availability and favorites', () => {
    expect(pipe.transform(books, '', 'borrowed').map(b => b.id)).toEqual([2]);
    expect(pipe.transform(books, '', 'available').map(b => b.id)).toEqual([1, 3]);
    expect(pipe.transform(books, '', 'all', true).map(b => b.id)).toEqual([1]);
  });

  it('does not change the original array', () => {
    pipe.transform(books, 'hobit', 'available', true);
    expect(books.length).toBe(3);
  });
});
