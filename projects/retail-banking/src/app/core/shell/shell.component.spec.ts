import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY } from 'rxjs';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService } from 'auth';

import { NARROW } from '../breakpoints';

import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let fixture: ComponentFixture<ShellComponent>;
  let state$: BehaviorSubject<BreakpointState>;
  let observe: jasmine.Spy;

  beforeEach(async () => {
    state$ = new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} });
    observe = jasmine.createSpy('observe').and.returnValue(state$);

    await TestBed.configureTestingModule({
      declarations: [ShellComponent],
      providers: [
        { provide: BreakpointObserver, useValue: { observe } },
        {
          provide: AuthService,
          useValue: {
            session: { profile: { displayName: 'Dana Whitfield' }, entitlements: [] },
            hasEntitlement: () => true,
          },
        },
        { provide: AnalyticsService, useValue: jasmine.createSpyObj('AnalyticsService', ['pageView', 'track']) },
        { provide: Router, useValue: { events: EMPTY, url: '/dashboard' } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();
  });

  it('observes the narrow breakpoint', () => {
    expect(observe).toHaveBeenCalledWith(NARROW);
  });

  it('docks the sidenav above the tablet breakpoint', () => {
    expect(fixture.componentInstance.handset).toBe(false);
    expect(fixture.componentInstance.sidenavMode).toBe('side');
  });

  it('switches the sidenav to an overlay below the tablet breakpoint', () => {
    state$.next({ matches: true, breakpoints: {} });

    expect(fixture.componentInstance.handset).toBe(true);
    expect(fixture.componentInstance.sidenavMode).toBe('over');
  });

  it('switches back to a docked sidenav when the viewport widens again', () => {
    state$.next({ matches: true, breakpoints: {} });
    state$.next({ matches: false, breakpoints: {} });

    expect(fixture.componentInstance.handset).toBe(false);
    expect(fixture.componentInstance.sidenavMode).toBe('side');
  });
});
