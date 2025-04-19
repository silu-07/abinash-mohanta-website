import { Component, HostBinding, HostListener } from '@angular/core';
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

export class HeaderComponent {
  showMobileNav = false;

  constructor(private cdr: ChangeDetectorRef) {}

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
  }
}
