import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NavRailComponent } from './nav-rail.component';

describe('NavRailComponent', () => {
  let fixture: ComponentFixture<NavRailComponent>;
  let component: NavRailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavRailComponent],
      imports: [NoopAnimationsModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavRailComponent);
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
