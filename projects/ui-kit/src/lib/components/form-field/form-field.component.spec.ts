import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormFieldComponent } from './form-field.component';

@Component({
  template: `<bk-form-field label="Amount" hint="USD"><input /></bk-form-field>`,
})
class HostFormFieldComponent {}

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<HostFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent, HostFormFieldComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostFormFieldComponent);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its own label, hint and projected control', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.bk-form-field__label')?.textContent).toContain('Amount');
    expect(element.querySelector('.bk-form-field__hint')?.textContent).toContain('USD');
    expect(element.querySelector('.bk-form-field__control input')).toBeTruthy();
  });

  it('renders without throwing when change detection runs twice', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
