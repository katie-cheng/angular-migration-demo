import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { SortHeaderComponent } from './sort-header.component';

describe('SortHeaderComponent', () => {
  let fixture: ComponentFixture<SortHeaderComponent>;
  let component: SortHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortHeaderComponent],
      imports: [NoopAnimationsModule, MatSortModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SortHeaderComponent);
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
