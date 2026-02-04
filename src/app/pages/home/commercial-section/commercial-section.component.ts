import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PhotoSectionCardComponent, PhotoItem } from '../../shared/photo-section-card/photo-section-card.component';

@Component({
  selector: 'app-commercial-section',
  standalone: true,
  imports: [CommonModule, PhotoSectionCardComponent],
  templateUrl: './commercial-section.component.html',
  styleUrl: './commercial-section.component.scss'
})
export class CommercialSectionComponent {
  sectionTag = 'Professional';
  sectionTitle = 'Commercial Photography';
  sectionDescription = 'Explore a curated selection of my best client work, captured across genres and locations. From professional portraits to commercial shoots, each image is crafted to tell a unique story and deliver value to my clients.';
  buttonText = 'View Portfolio';
  
  photographyImages: PhotoItem[] = [
    { src: 'carosuel-home/1.JPG', alt: 'Landscape', title: 'Landscape' },
    { src: 'carosuel-home/2.JPG', alt: 'Portrait', title: 'Portrait' },
    { src: 'carosuel-home/3.JPG', alt: 'Wildlife', title: 'Wildlife' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
  ];
  
  onViewMore() {
    window.location.href = '/commercial';
  }
}
