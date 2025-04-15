import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  isPlaying = true;

  private fullscreenChangeHandler: () => void;
  private carouselInstance: any;

  constructor() {
    this.fullscreenChangeHandler = () => {
      const closeButton = document.querySelector('#closeFullscreen') as HTMLElement;
      const carouselElement = document.querySelector('#carouselExample') as HTMLElement;
      if (closeButton) {
        closeButton.hidden = !document.fullscreenElement;
      }
      // Add or remove context menu prevention based on fullscreen state
      if (document.fullscreenElement) {
        carouselElement?.addEventListener('contextmenu', this.preventContextMenu);
      } else {
        carouselElement?.removeEventListener('contextmenu', this.preventContextMenu);
      }
    };
  }

  private preventContextMenu(event: Event) {
    event.preventDefault();
    return false;
  }

  ngAfterViewInit() {
    const carouselElement = document.querySelector('#carouselExample');
    if (carouselElement && (window as any).bootstrap?.Carousel) {
      this.carouselInstance = new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3500,
        ride: 'carousel',
        wrap: true,
        pause: false // <--- This disables pause on hover!
      });
  
      // Prevent right-click on all images in the carousel
      const images = carouselElement.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('contextmenu', this.preventContextMenu);
      });
    }
  }

  openFullscreen(event: Event) {
    // Prevent fullscreen on mobile devices (≤450px)
    if (window.innerWidth <= 450) {
      return;
    }
    const carouselElement = document.querySelector('#carouselExample') as HTMLElement;

    if (carouselElement) {
      if (carouselElement.requestFullscreen) {
        carouselElement.requestFullscreen();
      } else if ((carouselElement as any).webkitRequestFullscreen) {
        // Safari
        (carouselElement as any).webkitRequestFullscreen();
      } else if ((carouselElement as any).msRequestFullscreen) {
        // IE11
        (carouselElement as any).msRequestFullscreen();
      }

      // Add fullscreen change event listener
      document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);
      document.addEventListener('webkitfullscreenchange', this.fullscreenChangeHandler);
    }
  }

  stopCarousel() {
    if (this.carouselInstance) {
      if (this.isPlaying) {
        this.carouselInstance.pause();
      } else {
        this.carouselInstance.cycle();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  closeFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Safari
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      // IE11
      (document as any).msExitFullscreen();
    }
  }
}