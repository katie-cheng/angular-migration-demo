import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyAmountComponent } from './currency-amount.component';

describe('CurrencyAmountComponent', () => {
  let fixture: ComponentFixture<CurrencyAmountComponent>;
  let component: CurrencyAmountComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyAmountComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyAmountComponent);
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
