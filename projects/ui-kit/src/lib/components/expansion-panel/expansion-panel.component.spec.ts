import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelComponent } from './expansion-panel.component';

describe('ExpansionPanelComponent', () => {
  let fixture: ComponentFixture<ExpansionPanelComponent>;
  let component: ExpansionPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPanelComponent],
      imports: [NoopAnimationsModule, MatExpansionModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpansionPanelComponent);
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
