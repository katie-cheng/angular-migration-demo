import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { AmountInputComponent } from './amount-input.component';

describe('AmountInputComponent', () => {
  let fixture: ComponentFixture<AmountInputComponent>;
  let component: AmountInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmountInputComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AmountInputComponent);
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
