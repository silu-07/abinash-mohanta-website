import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial.component.html',
  styleUrl: './commercial.component.scss'
})
export class CommercialComponent implements AfterViewInit {
  galleryImages = [
    {
      "src": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "thumb": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=thumb&w=200&q=80",
      "subHtml": "<h4>Mountain Lake</h4><p>Beautiful view of a mountain lake.</p>"
    },
    {
      "src": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "thumb": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=200&q=80",
      "subHtml": "<h4>Desert</h4><p>Stunning desert landscape.</p>"
    },
    {
      "src": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "thumb": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=thumb&w=200&q=80",
      "subHtml": "<h4>Forest Path</h4><p>Enchanting path through a forest.</p>"
    },
    {
      "src": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "thumb": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=200&q=80",
      "subHtml": "<h4>City Lights</h4><p>Beautiful city skyline at night.</p>"
    }
  ]


  @ViewChild('lightGallery', { static: false }) lightGallery!: ElementRef;

  ngAfterViewInit(): void {
    if (this.lightGallery) {
      console.log('Initializing LightGallery', this.lightGallery.nativeElement);
      lightGallery(this.lightGallery.nativeElement, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        zoom: true
      });
    }
  }
}
