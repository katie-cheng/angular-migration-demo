import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let fixture: ComponentFixture<IconButtonComponent>;
  let component: IconButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
      imports: [NoopAnimationsModule, MatButtonModule, MatIconModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
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
