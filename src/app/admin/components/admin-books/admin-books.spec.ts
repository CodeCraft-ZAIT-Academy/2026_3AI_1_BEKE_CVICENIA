import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminBooks } from './admin-books';

describe('AdminBooks', () => {
  let component: AdminBooks;
  let fixture: ComponentFixture<AdminBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBooks],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
