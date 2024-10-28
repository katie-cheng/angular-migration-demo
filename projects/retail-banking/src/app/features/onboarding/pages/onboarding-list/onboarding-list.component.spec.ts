import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { OnboardingListComponent } from './onboarding-list.component';
import { OnboardingService } from '../../onboarding.service';

describe('OnboardingListComponent', () => {
  let fixture: ComponentFixture<OnboardingListComponent>;
  let component: OnboardingListComponent;
  let service: jasmine.SpyObj<OnboardingService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<OnboardingService>('OnboardingService', ['list', 'get', 'save', 'remove', 'first', 'count']);
    service.list.and.returnValue(of({ items: [], total: 0, page: 1, pageSize: 25 }));

    await TestBed.configureTestingModule({
      declarations: [OnboardingListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: OnboardingService, useValue: service }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingListComponent);
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
