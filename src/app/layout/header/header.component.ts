import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _showMobileNav = false;
  get showMobileNav() {
    return this._showMobileNav;
  }
  set showMobileNav(val: boolean) {
    this._showMobileNav = val;
    this.updateBodyOverflow();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Always enable scroll by default
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  updateBodyOverflow() {
    if (window.innerWidth <= 600 && this._showMobileNav) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  @HostBinding('class.scrolled') isScrolled = false;

  @HostListener('window:scroll', [])
  @HostListener('window:touchmove', [])
  @HostListener('window:orientationchange', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 2;
    this.cdr.markForCheck();
  }

  closeMobileNav() {
    this.showMobileNav = false;
    this.updateBodyOverflow();
  }
}
