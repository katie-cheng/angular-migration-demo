import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let fixture: ComponentFixture<NumberInputComponent>;
  let component: NumberInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberInputComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputComponent);
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
