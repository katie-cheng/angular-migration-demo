import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MetricTileComponent } from './metric-tile.component';

describe('MetricTileComponent', () => {
  let fixture: ComponentFixture<MetricTileComponent>;
  let component: MetricTileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricTileComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricTileComponent);
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
