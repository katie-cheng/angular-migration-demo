import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './disable-control.directive';

@Component({ template: '<div></div>' })
class HostDisableControlDirective {}

describe('DisableControlDirective', () => {
  let fixture: ComponentFixture<HostDisableControlDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisableControlDirective, HostDisableControlDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostDisableControlDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
