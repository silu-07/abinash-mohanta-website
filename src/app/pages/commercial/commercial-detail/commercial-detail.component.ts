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
  selector: 'app-commercial-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, InViewportDirective, MoveToTopComponent, GalleryModalComponent],
  templateUrl: './commercial-detail.component.html',
  styleUrl: './commercial-detail.component.scss'
})
export class CommercialDetailComponent implements OnInit, OnDestroy {
  galleryId: string = '';
  gallery: GalleryData | null = null;
  
  // Gallery modal state
  isGalleryOpen = false;
  selectedImageIndex = 0;
  
  // Store randomized classes for each item
  private cardClasses: string[] = [];

  // Gallery data - in real app this would come from a service
  private readonly galleries: { [key: string]: GalleryData } = {
    'kid': {
      title: 'Kid Photography',
      description: 'Capturing the joy and innocence of childhood moments',
      images: [
        { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', title: 'Playful Moments' },
        { url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', title: 'Happy Smile' },
        { url: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80', title: 'Outdoor Fun' },
        { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', title: 'Curious Eyes' },
        { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?auto=format&fit=crop&w=800&q=80', title: 'Birthday Joy' },
        { url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80', title: 'Sweet Dreams' },
      ]
    },
    'engagement': {
      title: 'Engagement Sessions',
      description: 'Celebrating love stories with beautiful engagement photography',
      images: [
        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Ring Moment' },
        { url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80', title: 'Together Forever' },
        { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80', title: 'Sunset Love' },
        { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', title: 'Hand in Hand' },
        { url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=800&q=80', title: 'The Proposal' },
        { url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80', title: 'Garden Romance' },
      ]
    },
    'marraige': {
      title: 'Wedding Photography',
      description: 'Documenting the most precious day of your life',
      images: [
        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'The Ceremony' },
        { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'First Dance' },
        { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', title: 'Wedding Venue' },
        { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', title: 'Bridal Beauty' },
        { url: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80', title: 'Reception' },
        { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80', title: 'Couple Portrait' },
        { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', title: 'Wedding Details' },
        { url: 'https://images.unsplash.com/photo-1549417229-7686ac5595fd?auto=format&fit=crop&w=800&q=80', title: 'Celebration' },
      ]
    },
    'birthday': {
      title: 'Birthday Celebrations',
      description: 'Making every birthday memorable with stunning photography',
      images: [
        { url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80', title: 'Birthday Cake' },
        { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', title: 'Party Time' },
        { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80', title: 'Colorful Balloons' },
        { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80', title: 'Confetti Joy' },
        { url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80', title: 'Special Day' },
        { url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80', title: 'Celebration' },
      ]
    },
    'outdoor': {
      title: 'Outdoor Sessions',
      description: 'Beautiful outdoor photography in natural settings',
      images: [
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', title: 'Mountain View' },
        { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', title: 'Nature Walk' },
        { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'Scenic Lake' },
        { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Misty Forest' },
        { url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80', title: 'Waterfall' },
        { url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', title: 'Forest Path' },
      ]
    },
    'prewedding': {
      title: 'Pre-Wedding Shoots',
      description: 'Romantic pre-wedding photography sessions',
      images: [
        { url: 'https://images.unsplash.com/photo-1537907510278-a4a7f36ccc8e?auto=format&fit=crop&w=800&q=80', title: 'Beach Romance' },
        { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80', title: 'Sunset Silhouette' },
        { url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80', title: 'Garden Love' },
        { url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80', title: 'City Backdrop' },
        { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', title: 'Candid Moments' },
        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Classic Portrait' },
        { url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=800&q=80', title: 'Dreamy Bokeh' },
        { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'Dancing Together' },
      ]
    }
  };

  // Default gallery for unmatched routes
  private readonly defaultGallery: GalleryData = {
    title: 'Commercial Gallery',
    description: 'Professional photography for your special moments',
    images: [
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Love Story' },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'Celebration' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', title: 'Venue' },
      { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', title: 'Portrait' },
      { url: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80', title: 'Event' },
      { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80', title: 'Couple' },
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
