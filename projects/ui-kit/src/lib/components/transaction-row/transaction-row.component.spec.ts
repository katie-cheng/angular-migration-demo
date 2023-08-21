import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionRowComponent } from './transaction-row.component';

describe('TransactionRowComponent', () => {
  let fixture: ComponentFixture<TransactionRowComponent>;
  let component: TransactionRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionRowComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRowComponent);
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
