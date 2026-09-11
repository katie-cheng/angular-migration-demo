import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let component: MenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [NoopAnimationsModule, MatMenuModule, MatButtonModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
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
