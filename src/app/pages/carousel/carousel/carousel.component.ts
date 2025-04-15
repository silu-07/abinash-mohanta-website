import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      const carouselElement = document.querySelector('#carouselExample');
      if (carouselElement) {
        const bootstrapCarousel = (window as any).bootstrap?.Carousel;
        if (bootstrapCarousel) {
          new bootstrapCarousel(carouselElement, {
            interval: 2000, // 2 seconds interval between slides
            ride: 'carousel', // Automatically start the carousel
            wrap: true // Enable infinite looping
          });
        } else {
          console.error('Bootstrap Carousel is not loaded.');
        }
      } else {
        console.error('Carousel element not found.');
      }
    });
  }

  openFullscreen(event: Event) {
    const carouselElement = document.querySelector('#carouselExample') as HTMLElement;
    const closeButton = document.querySelector('#closeFullscreen') as HTMLElement;

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

      // Show the close button in fullscreen mode
      if (closeButton) {
        closeButton.hidden = false;
      }
    }
  }

  closeFullscreen() {
    const closeButton = document.querySelector('#closeFullscreen') as HTMLElement;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Safari
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      // IE11
      (document as any).msExitFullscreen();
    }

    // Hide the close button when exiting fullscreen mode
    if (closeButton) {
      closeButton.hidden = true;
    }
  }
}