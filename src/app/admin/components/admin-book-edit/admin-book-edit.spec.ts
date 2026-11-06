import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminBookEdit } from './admin-book-edit';

describe('AdminBookEdit', () => {
  let component: AdminBookEdit;
  let fixture: ComponentFixture<AdminBookEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookEdit],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
