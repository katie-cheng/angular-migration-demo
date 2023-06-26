import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StatusPillComponent } from './status-pill.component';

describe('StatusPillComponent', () => {
  let fixture: ComponentFixture<StatusPillComponent>;
  let component: StatusPillComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusPillComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusPillComponent);
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
