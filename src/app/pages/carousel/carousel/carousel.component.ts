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
    const carouselElement = document.querySelector('#carouselExample');
    // Ensure Bootstrap is globally available or import it
    const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
      interval: 2000, // 1.2 seconds
      ride: 'carousel', // Automatically start the carousel
      wrap: true // Ensure infinite looping of images
    });
  }
}