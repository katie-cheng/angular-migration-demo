import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TrimInputDirective } from './trim-input.directive';

@Component({ template: '<div></div>' })
class HostTrimInputDirective {}

describe('TrimInputDirective', () => {
  let fixture: ComponentFixture<HostTrimInputDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrimInputDirective, HostTrimInputDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostTrimInputDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
