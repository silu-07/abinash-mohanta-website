import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveToTopComponent } from './movetotop/movetotop.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MoveToTopComponent, HeaderComponent, FooterComponent],
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
      }, 3000);
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

  ngAfterViewInit() {
    this.autoScrollInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // every 3 seconds

    // Keyboard navigation for modal
    window.addEventListener('keydown', this.handleKeyDown);
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
    }
  };

}

