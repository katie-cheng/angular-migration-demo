import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let fixture: ComponentFixture<DateRangeComponent>;
  let component: DateRangeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangeComponent],
      imports: [NoopAnimationsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders without throwing when change detection runs twice', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
