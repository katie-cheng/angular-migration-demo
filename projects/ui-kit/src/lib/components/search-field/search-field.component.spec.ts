import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let fixture: ComponentFixture<SearchFieldComponent>;
  let component: SearchFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFieldComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
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
