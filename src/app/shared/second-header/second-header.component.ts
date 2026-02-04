import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { titleFadeAnimation } from '../../animations/second-header-title-fade';
import { SecondHeaderService } from './second-header.service';

@Component({
  selector: 'app-second-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.scss',
  animations: [...titleFadeAnimation]
})
export class SecondHeaderComponent implements OnDestroy {
  @Input() customTitle: string | null = null; // Custom title override (for direct input)
  @Input() description: string | null = null; // Optional description (for direct input)
  
  // Service-based custom title and description
  serviceCustomTitle: string | null = null;
  serviceDescription: string | null = null;
  
  secondHeaderTitle: string | null = null;
  showLogo = true;
  currentTitleKey = 'home';
  
  private readonly destroy$ = new Subject<void>();

  private readonly routeTitleMap: { [key: string]: string | null } = {
    home: null,
    about: 'ABOUT ME',
    contact: 'CONTACT',
    personal: 'PERSONAL WORK',
    commercial: 'COMMERCIAL WORK',
    reviews: 'CLIENT REVIEWS',
  };

  constructor(
    private readonly router: Router,
    private readonly headerService: SecondHeaderService
  ) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects || event.url;
      const path = url.split('/')[1] || 'home';
      this.currentTitleKey = path;
      this.secondHeaderTitle = this.routeTitleMap[path];
      this.showLogo = path === 'home';
    });
    
    // Listen to service for custom header data
    this.headerService.headerData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.serviceCustomTitle = data.customTitle;
      this.serviceDescription = data.description;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Returns custom title (from input or service), otherwise uses route-based title
  get displayTitle(): string | null {
    // Priority: Input customTitle > Service customTitle > Route-based title
    if (this.customTitle) {
      return this.customTitle;
    }
    if (this.serviceCustomTitle) {
      return this.serviceCustomTitle;
    }
    return this.secondHeaderTitle;
  }
  
  // Returns description from input or service
  get displayDescription(): string | null {
    return this.description || this.serviceDescription;
  }
  
  // Show logo only if on home and no custom title is set
  get shouldShowLogo(): boolean {
    return this.showLogo && !this.customTitle && !this.serviceCustomTitle;
  }
}