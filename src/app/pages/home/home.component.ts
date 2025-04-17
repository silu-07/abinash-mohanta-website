import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  // Modal state for fullscreen image
  modalOpen: boolean = false;
  modalImage: string = '';


  ngOnInit(): void { }

  showMobileNav = false;

  @ViewChild('lightGallery', { static: false }) lightGallery!: ElementRef;

  lgInstance: any; // To hold the LightGallery instance

  isGalleryOpen = false;

  images: string[] = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80'
  ];

  ngAfterViewInit(): void {
    if (this.lightGallery) {
      this.lgInstance = lightGallery(this.lightGallery.nativeElement, {
        plugins: [lgThumbnail, lgZoom, lgFullscreen, lgAutoplay],
        speed: 600,
        thumbnail: true,
        zoom: false,
        autoplay: true,
        autoplayControls: true,
        autoplayInterval: 2000,
        mode: 'lg-slide'
      } as any);
  
      // Listen for LightGallery events
      this.lightGallery.nativeElement.addEventListener('lgAfterOpen', () => {
        this.isGalleryOpen = true;
        console.log('LightGallery opened, isGalleryOpen:', this.isGalleryOpen);
        this.cdr.markForCheck();
      });
      this.lightGallery.nativeElement.addEventListener('lgAfterClose', () => {
        this.isGalleryOpen = false;
        console.log('LightGallery closed, isGalleryOpen:', this.isGalleryOpen);
        this.cdr.markForCheck();
      });
    }
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

