import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ElevationDirective } from './elevation.directive';

@Component({ template: '<div></div>' })
class HostElevationDirective {}

describe('ElevationDirective', () => {
  let fixture: ComponentFixture<HostElevationDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElevationDirective, HostElevationDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostElevationDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
