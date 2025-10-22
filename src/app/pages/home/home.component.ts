import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModalComponent } from '../../shared/modal/gallery-modal/gallery-modal.component';
import { PersonalSectionComponent } from "./personal-section/personal-section.component";
import { CommercialSectionComponent } from "./commercial-section/commercial-section.component";
import { AboutSectionComponent } from "./about-section/about-section.component";
import { HomeConstants } from './home.constants';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryModalComponent, PersonalSectionComponent, CommercialSectionComponent, AboutSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public isGalleryOpen = false;
  public selectedGalleryIndex = 0;
  public images: string[] = HomeConstants.HOME_CAROUSEL_IMAGES;
  private carouselInstance: any | null = null;
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.initBootstrapCarousel();
  }

  private initBootstrapCarousel(): void {
    const carouselElement = document.getElementById('homeBootstrapCarousel');
    if (!carouselElement) {
      return;
    }
    const bs = (window as any)?.bootstrap;
    if (bs && bs.Carousel) {
      this.carouselInstance = new bs.Carousel(carouselElement, {
        interval: 4000,
        ride: 'carousel',
        pause: false,
        touch: true,
        wrap: true
      });
      fromEvent(carouselElement, 'slid.bs.carousel')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        });
    }
  }

  openGalleryAt(index: number): void {
    this.selectedGalleryIndex = index;
    this.isGalleryOpen = true;
  }

  onCloseGallery(): void {
    this.isGalleryOpen = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.carouselInstance && typeof this.carouselInstance.dispose === 'function') {
      try {
        this.carouselInstance.dispose();
      } catch {
      }
      this.carouselInstance = null;
    }
  }
}