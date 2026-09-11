import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let fixture: ComponentFixture<DatepickerComponent>;
  let component: DatepickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
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
