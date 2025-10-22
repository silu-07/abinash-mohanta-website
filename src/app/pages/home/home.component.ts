import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModalComponent } from '../../shared/modal/gallery-modal/gallery-modal.component';
import { PersonalSectionComponent } from "./personal-section/personal-section.component";
import { CommercialSectionComponent } from "./commercial-section/commercial-section.component";
import { AboutSectionComponent } from "./about-section/about-section.component";

// Fix for TS7015: declare window.bootstrap
declare global {
  interface Window {
    bootstrap: any;
  }
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryModalComponent, PersonalSectionComponent, CommercialSectionComponent, AboutSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {


  showMobileNav = false;
  isGalleryOpen = false;
  selectedGalleryIndex = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  images: string[] = [
    'carosuel-home/1.JPG',
    'carosuel-home/2.JPG',
    'carosuel-home/3.JPG',
  ];

  ngAfterViewInit(): void {
    // --- Bootstrap Carousel Manual Initialization ---
    const carouselElement = document.getElementById('homeBootstrapCarousel');
    if (carouselElement && window.bootstrap && window.bootstrap.Carousel) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 4000, // 4 seconds
        ride: 'carousel',
        pause: false,
        touch: true,
        wrap: true
      });
    }
  }

  openGalleryAt(index: number) {
    this.selectedGalleryIndex = index;
    this.isGalleryOpen = true;
  }

  onCloseGallery() {
    this.isGalleryOpen = false;
  }

  ngOnDestroy() { }

}

