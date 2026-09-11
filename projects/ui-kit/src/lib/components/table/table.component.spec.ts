import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [NoopAnimationsModule, MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
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
