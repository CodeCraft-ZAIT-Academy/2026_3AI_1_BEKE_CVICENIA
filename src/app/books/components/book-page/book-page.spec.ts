import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookPage } from './book-page';

describe('BookPage', () => {
  let component: BookPage;
  let fixture: ComponentFixture<BookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
