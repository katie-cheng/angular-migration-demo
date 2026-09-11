import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let fixture: ComponentFixture<PaginatorComponent>;
  let component: PaginatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [NoopAnimationsModule, MatPaginatorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
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
