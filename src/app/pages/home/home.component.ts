import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Modal state for fullscreen image
  modalOpen: boolean = false;
  modalImage: string = '';


  ngOnInit(): void { }

  showMobileNav = false;
  touchStartX = 0;
  touchEndX = 0;
  currentIndex: number = 0;
  autoScrollInterval: any;
  autoScrollTimeout: any;

  @ViewChild('lightGallery', { static: false }) lightGallery!: ElementRef;

  lgInstance: any; // To hold the LightGallery instance

  images: string[] = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80'
  ];

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  prevImage() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
    if (this.autoScrollTimeout) {
      clearTimeout(this.autoScrollTimeout);
    }
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    if (this.modalOpen) {
      this.modalImage = this.images[this.currentIndex];
    }
    // Resume auto-scroll after 3 seconds
    this.autoScrollTimeout = setTimeout(() => {
      if (!this.autoScrollInterval) {
        this.autoScrollInterval = setInterval(() => {
          this.nextImage();
        }, 2000);
      }
    }, 300);
  }

  nextImage() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
    if (this.autoScrollTimeout) {
      clearTimeout(this.autoScrollTimeout);
    }
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (this.modalOpen) {
      this.modalImage = this.images[this.currentIndex];
    }
    // Resume auto-scroll after 3 seconds
    this.autoScrollTimeout = setTimeout(() => {
      if (!this.autoScrollInterval) {
        this.autoScrollInterval = setInterval(() => {
          this.nextImage();
        }, 2000);
      }
    }, 300);
  }


  // Swipe for main image row
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    // Pause auto image scrolling while swiping
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
      if (deltaX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
    // Resume auto image scrolling after swipe
    if (!this.autoScrollInterval) {
      this.autoScrollInterval = setInterval(() => {
        this.nextImage();
      }, 2000);
    }
  }

  ngAfterViewInit(): void {
    if (this.lightGallery) {
      // Cast config to 'any' to allow plugin-specific options (autoplayInterval)
      this.lgInstance = lightGallery(this.lightGallery.nativeElement, {
        plugins: [lgThumbnail, lgZoom, lgAutoplay],
        speed: 500,
        thumbnail: true,
        zoom: false,
        autoplay: true,
        autoplayControls: true,
        autoplayInterval: 2000 // ms between slides
      } as any);
    }
    // Start auto slideshow
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
    this.autoScrollInterval = setInterval(() => {
      this.nextImage();
    }, 2000); // 2000 ms = 2 seconds
  }

  openGalleryAt(index: number) {
    if (this.lgInstance && this.lgInstance.openGallery) {
      this.lgInstance.openGallery(index);
    } else if (
      this.lightGallery &&
      (this.lightGallery.nativeElement as any).lgData &&
      (this.lightGallery.nativeElement as any).lgData.openGallery
    ) {
      // Fallback for some LightGallery versions
      (this.lightGallery.nativeElement as any).lgData.openGallery(index);
    }
  }

  ngOnDestroy() { }

}

