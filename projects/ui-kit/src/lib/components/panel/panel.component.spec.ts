import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let fixture: ComponentFixture<PanelComponent>;
  let component: PanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
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
