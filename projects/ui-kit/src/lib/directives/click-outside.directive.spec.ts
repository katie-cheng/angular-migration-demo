import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({ template: '<div></div>' })
class HostClickOutsideDirective {}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<HostClickOutsideDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, HostClickOutsideDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostClickOutsideDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
