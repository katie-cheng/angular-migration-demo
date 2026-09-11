import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let fixture: ComponentFixture<TabsComponent>;
  let component: TabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsComponent],
      imports: [NoopAnimationsModule, MatTabsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
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
