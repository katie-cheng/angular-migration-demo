import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KeyValueListComponent } from './key-value-list.component';

describe('KeyValueListComponent', () => {
  let fixture: ComponentFixture<KeyValueListComponent>;
  let component: KeyValueListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyValueListComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyValueListComponent);
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
