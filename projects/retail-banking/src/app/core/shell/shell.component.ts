import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService, Session } from 'auth';

import { NARROW } from '../breakpoints';

import { NAV_ITEMS, NavItem } from './nav-items';

@Component({
  selector: 'bk-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav?: MatSidenav;
  @ViewChild('toolbar', { read: ElementRef }) toolbar?: ElementRef<HTMLElement>;

  readonly navItems: NavItem[] = NAV_ITEMS;
  session: Session | null = null;
  handset = false;
  sidenavMode: 'side' | 'over' = 'side';
  toolbarHeight = 0;

  private readonly destroyed$ = new Subject<void>();
  private resizeObserver?: ResizeObserver;

  constructor(
    private readonly breakpoints: BreakpointObserver,
    private readonly auth: AuthService,
    private readonly analytics: AnalyticsService,
    private readonly router: Router,
    private readonly zone: NgZone,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.session = this.auth.session;

    this.breakpoints
      .observe(NARROW)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        this.handset = state.matches;
        this.sidenavMode = this.handset ? 'over' : 'side';
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        if (this.handset && this.sidenav) {
          this.sidenav.close();
        }
      });
  }

  ngAfterViewInit(): void {
    const element = this.toolbar?.nativeElement;
    if (!element) {
      return;
    }

    this.measureToolbar();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() =>
        this.zone.run(() => this.measureToolbar())
      );
      this.resizeObserver.observe(element);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private measureToolbar(): void {
    const height = this.toolbar?.nativeElement.offsetHeight ?? 0;
    if (height === this.toolbarHeight) {
      return;
    }

    this.toolbarHeight = height;
    this.changeDetector.detectChanges();
  }

  visibleNavItems(): NavItem[] {
    return this.navItems.filter(
      (item) => !item.entitlement || this.auth.hasEntitlement(item.entitlement)
    );
  }

  toggle(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  trackNav(item: NavItem): void {
    this.analytics.track('cta_click', { id: 'nav:' + item.route });
  }

  logout(): void {
    this.analytics.flush();
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
