import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let fixture: ComponentFixture<MultiSelectComponent>;
  let component: MultiSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
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
