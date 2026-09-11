import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [NoopAnimationsModule, MatButtonModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
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
