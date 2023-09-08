import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

@Component({ template: '<div></div>' })
class HostCopyToClipboardDirective {}

describe('CopyToClipboardDirective', () => {
  let fixture: ComponentFixture<HostCopyToClipboardDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyToClipboardDirective, HostCopyToClipboardDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostCopyToClipboardDirective);
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
