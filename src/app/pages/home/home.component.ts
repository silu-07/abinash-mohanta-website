import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModalComponent } from '../../shared/modal/gallery-modal/gallery-modal.component';

// Fix for TS7015: declare window.bootstrap
declare global {
  interface Window {
    bootstrap: any;
  }
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryModalComponent],
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
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80'
  ];

  ngAfterViewInit(): void {
    // --- Bootstrap Carousel Manual Initialization ---
    const carouselElement = document.getElementById('homeBootstrapCarousel');
    if (carouselElement && window.bootstrap && window.bootstrap.Carousel) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 2000, // 2 seconds
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

