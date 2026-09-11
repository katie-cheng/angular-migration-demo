import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { BillPayListComponent } from './bill-pay-list.component';
import { BillPayService } from '../../bill-pay.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BillPayListComponent', () => {
  let fixture: ComponentFixture<BillPayListComponent>;
  let component: BillPayListComponent;
  let service: jasmine.SpyObj<BillPayService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<BillPayService>('BillPayService', ['list', 'get', 'save', 'remove', 'first', 'count']);
    service.list.and.returnValue(of({ items: [], total: 0, page: 1, pageSize: 25 }));

    await TestBed.configureTestingModule({
    declarations: [BillPayListComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ReactiveFormsModule, RouterTestingModule],
    providers: [{ provide: BillPayService, useValue: service }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(BillPayListComponent);
    component = fixture.componentInstance;
  });

  it('loads the first page on init', () => {
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith(1, 25);
    expect(component.loading).toBeFalse();
  });

  it('surfaces a friendly error when loading fails', () => {
    service.list.and.returnValue(throwError(() => new Error('boom')));
    fixture.detectChanges();

    expect(component.error).toContain('could not load');
  });

  it('reloads from page one when the search changes', fakeAsync(() => {
    fixture.detectChanges();
    component.page = 3;
    component.search.setValue('groceries');
    tick(300);

    expect(component.page).toBe(1);
  }));

  it('applies paginator events', () => {
    fixture.detectChanges();
    component.onPage({ pageIndex: 2, pageSize: 50, length: 100 });

    expect(service.list).toHaveBeenCalledWith(3, 50);
  });
});
