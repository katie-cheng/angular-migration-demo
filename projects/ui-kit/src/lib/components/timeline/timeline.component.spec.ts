import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let fixture: ComponentFixture<TimelineComponent>;
  let component: TimelineComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
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
