import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChipListComponent } from './chip-list.component';

describe('ChipListComponent', () => {
  let fixture: ComponentFixture<ChipListComponent>;
  let component: ChipListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipListComponent],
      imports: [NoopAnimationsModule, MatChipsModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipListComponent);
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
