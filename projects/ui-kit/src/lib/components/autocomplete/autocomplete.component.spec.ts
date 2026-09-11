import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let fixture: ComponentFixture<AutocompleteComponent>;
  let component: AutocompleteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
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
