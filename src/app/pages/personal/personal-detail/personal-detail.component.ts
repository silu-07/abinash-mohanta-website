import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InViewportDirective } from '../../../shared/directives/in-viewport.directive';
import { MoveToTopComponent } from '../../../shared/movetotop/movetotop.component';
import { SecondHeaderService } from '../../../shared/second-header/second-header.service';
import { GalleryModalComponent } from '../../../shared/modal/gallery-modal/gallery-modal.component';

interface GalleryImage {
  url: string;
  title: string;
}

interface GalleryData {
  title: string;
  description: string;
  images: GalleryImage[];
}

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, InViewportDirective, MoveToTopComponent, GalleryModalComponent],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.scss'
})
export class PersonalDetailComponent implements OnInit, OnDestroy {
  galleryId: string = '';
  gallery: GalleryData | null = null;
  
  // Gallery modal state
  isGalleryOpen = false;
  selectedImageIndex = 0;
  
  // Store randomized classes for each item
  private cardClasses: string[] = [];

  // Gallery data - in real app this would come from a service
  private readonly galleries: { [key: string]: GalleryData } = {
    'mountain-sunrise': {
      title: 'Mountain Sunrise',
      description: 'Capturing the magical moments when the first light touches the peaks',
      images: [
        { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Dawn Breaking' },
        { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', title: 'Mountain Peak' },
        { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', title: 'Starry Summit' },
        { url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80', title: 'Alpine Glow' },
        { url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80', title: 'Misty Peaks' },
        { url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80', title: 'Golden Hour' },
        { url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80', title: 'Valley View' },
        { url: 'https://images.unsplash.com/photo-1445363692815-ebcd599f7621?auto=format&fit=crop&w=800&q=80', title: 'Summit Dreams' },
      ]
    },
    'golden-hour': {
      title: 'Golden Hour',
      description: 'The magic of light during the most beautiful time of day',
      images: [
        { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', title: 'Sunset Fields' },
        { url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=800&q=80', title: 'Warm Glow' },
        { url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80', title: 'Evening Light' },
        { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', title: 'Beach Sunset' },
        { url: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=800&q=80', title: 'Sun Rays' },
        { url: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?auto=format&fit=crop&w=800&q=80', title: 'Dusk' },
      ]
    },
    'portrait-session': {
      title: 'Portrait Session',
      description: 'Capturing personalities and emotions through intimate portraits',
      images: [
        { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', title: 'Natural Beauty' },
        { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', title: 'Studio Light' },
        { url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80', title: 'Elegance' },
        { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', title: 'Smile' },
        { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', title: 'Thoughtful' },
        { url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80', title: 'Candid' },
        { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', title: 'Fashion' },
        { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80', title: 'Artistic' },
      ]
    }
  };

  // Default gallery for unmatched routes
  private readonly defaultGallery: GalleryData = {
    title: 'Photo Gallery',
    description: 'A collection of beautiful moments captured through the lens',
    images: [
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', title: 'Nature' },
      { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'Horizon' },
      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Misty' },
      { url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80', title: 'Waterfall' },
      { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80', title: 'Forest' },
    ]
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly headerService: SecondHeaderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.galleryId = params['id'] || '';
      this.gallery = this.galleries[this.galleryId] || this.defaultGallery;
      this.randomizeLayout();
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Update the second header with gallery title and description
      if (this.gallery) {
        this.headerService.setHeaderData(this.gallery.title, this.gallery.description);
      }
    });
  }

  ngOnDestroy(): void {
    // Clear the custom header data when leaving the detail page
    this.headerService.clearHeaderData();
  }

  // Smart randomize layout - avoids gaps
  private randomizeLayout(): void {
    if (!this.gallery) return;
    
    const totalItems = this.gallery.images.length;
    const classes: string[] = [];
    
    let wideCount = 0;
    let tallCount = 0;
    const maxWide = Math.floor(totalItems * 0.15);
    const maxTall = Math.floor(totalItems * 0.25);
    
    for (let i = 0; i < totalItems; i++) {
      const random = Math.random();
      
      if (random < 0.15 && wideCount < maxWide && i < totalItems - 1) {
        classes.push('wide');
        wideCount++;
      } else if (random < 0.4 && tallCount < maxTall) {
        classes.push('tall');
        tallCount++;
      } else {
        classes.push('normal');
      }
    }
    
    this.cardClasses = this.shuffleArray(classes);
  }
  
  private shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getCardClass(index: number): string {
    return this.cardClasses[index] || 'normal';
  }

  // Get all image URLs for the gallery modal
  get galleryImages(): string[] {
    return this.gallery?.images.map(img => img.url) || [];
  }

  // Get all image titles for the gallery modal
  get galleryTitles(): string[] {
    return this.gallery?.images.map(img => img.title) || [];
  }

  // Open gallery modal at specific image
  openGalleryAt(index: number): void {
    this.selectedImageIndex = index;
    this.isGalleryOpen = true;
  }

  // Close gallery modal
  onCloseGallery(): void {
    this.isGalleryOpen = false;
  }
}
