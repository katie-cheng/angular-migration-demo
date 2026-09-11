import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let fixture: ComponentFixture<ProgressBarComponent>;
  let component: ProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      imports: [NoopAnimationsModule, MatProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
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
