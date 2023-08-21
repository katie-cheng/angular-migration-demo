import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';

@Component({ template: '<div></div>' })
class HostAutofocusDirective {}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<HostAutofocusDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutofocusDirective, HostAutofocusDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostAutofocusDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
