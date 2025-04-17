import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveToTopComponent } from './movetotop/movetotop.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from "../../layout/footer/footer.component";
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

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

  openImageModal(img: string) {
    this.modalImage = img;
    this.modalOpen = true;
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  closeImageModal() {
    this.modalOpen = false;
    this.modalImage = '';
    if (!this.autoScrollInterval) {
      this.autoScrollInterval = setInterval(() => {
        this.nextImage();
      }, 2000);
    }
  }

  ngOnInit(): void {}

  showMobileNav = false;
  touchStartX = 0;
  touchEndX = 0;
  images: string[] = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80'
  ];
  currentIndex: number = 0;

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    if (this.modalOpen) {
      this.modalImage = this.images[this.currentIndex];
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (this.modalOpen) {
      this.modalImage = this.images[this.currentIndex];
    }
  }

  autoScrollInterval: any;

  // Swipe for main image row
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
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
  }

  // Swipe for modal fullscreen image
  modalTouchStart(event: TouchEvent) {
    if (!this.modalOpen) return;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  modalTouchMove(event: TouchEvent) {
    if (!this.modalOpen) return;
    this.touchEndX = event.changedTouches[0].screenX;
  }

  modalTouchEnd(event: TouchEvent) {
    if (!this.modalOpen) return;
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }


  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.modalOpen) return;
    if (event.key === 'ArrowLeft') {
      this.prevImage();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
      event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.closeImageModal();
      event.preventDefault();
    }
  };

  
  @ViewChild('lightGallery', { static: false }) lightGallery!: ElementRef;

  lgInstance: any; // To hold the LightGallery instance
  
  ngAfterViewInit(): void {
    if (this.lightGallery) {
      this.lgInstance = lightGallery(this.lightGallery.nativeElement, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        zoom: true
      });
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

}

