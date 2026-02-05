import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoSectionCardComponent, PhotoItem } from '../../shared/photo-section-card/photo-section-card.component';
import { COMMERCIAL_PROJECTS } from '../../../data/commercial-projects.data';

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
  
  // Use first 6 images from shared commercial projects data
  photographyImages: PhotoItem[] = COMMERCIAL_PROJECTS.slice(0, 6).map(project => ({
    src: project.image,
    alt: project.title,
    title: project.title
  }));

  constructor(private readonly router: Router) {}
  
  onViewMore() {
    this.router.navigate(['/commercial']);
  }

  onPhotoClick(photo: PhotoItem) {
    const slug = photo.title.toLowerCase().replaceAll(/\s+/g, '-');
    this.router.navigate(['/commercial', slug]);
  }
}
