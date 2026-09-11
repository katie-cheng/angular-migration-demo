import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [NoopAnimationsModule, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
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
