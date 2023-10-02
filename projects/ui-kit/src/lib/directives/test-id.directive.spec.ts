import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TestIdDirective } from './test-id.directive';

@Component({ template: '<div></div>' })
class HostTestIdDirective {}

describe('TestIdDirective', () => {
  let fixture: ComponentFixture<HostTestIdDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestIdDirective, HostTestIdDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostTestIdDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
