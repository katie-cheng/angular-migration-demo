import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SectionHeadingComponent } from './section-heading.component';

describe('SectionHeadingComponent', () => {
  let fixture: ComponentFixture<SectionHeadingComponent>;
  let component: SectionHeadingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHeadingComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeadingComponent);
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
