import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
  let fixture: ComponentFixture<SparklineComponent>;
  let component: SparklineComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SparklineComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function polyline(): SVGPolylineElement {
    return fixture.nativeElement.querySelector('polyline') as SVGPolylineElement;
  }

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('draws a flat baseline when there is nothing to plot', () => {
    expect(component.points).toBe('0,30');
  });

  it('scales the tallest value to the top of the viewbox', () => {
    component.values = [10, 40, 20];
    expect(component.points).toBe('0,22.5 50,0 100,15');
  });

  it('spaces the points evenly across the full width', () => {
    component.values = [1, 1, 1, 1, 1];
    const xs = component.points.split(' ').map((point) => Number(point.split(',')[0]));
    expect(xs).toEqual([0, 25, 50, 75, 100]);
  });

  it('renders the points and the stroke colour onto the polyline', () => {
    fixture.componentRef.setInput('values', [5, 10]);
    fixture.componentRef.setInput('stroke', '#a3232b');
    fixture.detectChanges();

    expect(polyline().getAttribute('points')).toBe('0,15 100,0');
    expect(polyline().getAttribute('stroke')).toBe('#a3232b');
  });

  it('labels the chart for assistive technology', () => {
    fixture.componentRef.setInput('label', 'Spending trend');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('aria-label')).toBe(
      'Spending trend'
    );
  });
});
