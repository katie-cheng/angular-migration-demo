import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AccountTileComponent } from './account-tile.component';

describe('AccountTileComponent', () => {
  let fixture: ComponentFixture<AccountTileComponent>;
  let component: AccountTileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTileComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTileComponent);
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
