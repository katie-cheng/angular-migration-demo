import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { SlideToggleComponent } from './slide-toggle.component';

describe('SlideToggleComponent', () => {
  let fixture: ComponentFixture<SlideToggleComponent>;
  let component: SlideToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideToggleComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatSlideToggleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideToggleComponent);
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
