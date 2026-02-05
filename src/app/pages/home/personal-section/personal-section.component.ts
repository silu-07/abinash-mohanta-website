import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoSectionCardComponent, PhotoItem } from '../../shared/photo-section-card/photo-section-card.component';
import { PERSONAL_PROJECTS } from '../../../data/personal-projects.data';

@Component({
  selector: 'app-personal-section',
  standalone: true,
  imports: [CommonModule, PhotoSectionCardComponent],
  templateUrl: './personal-section.component.html',
  styleUrl: './personal-section.component.scss'
})
export class PersonalSectionComponent {
  sectionTag = 'Portfolio';
  sectionTitle = 'Dailylife Photography';
  sectionDescription = 'Explore a curated selection of my best client work, captured across genres and locations. From professional portraits to commercial shoots, each image is crafted to tell a unique story.';
  buttonText = 'Explore Gallery';
  
  // Use first 6 images from shared personal projects data
  photographyImages: PhotoItem[] = PERSONAL_PROJECTS.slice(0, 6).map(project => ({
    src: project.image,
    alt: project.title,
    title: project.title
  }));

  constructor(private readonly router: Router) {}
  
  onViewMore() {
    this.router.navigate(['/personal']);
  }

  onPhotoClick(photo: PhotoItem) {
    const slug = photo.title.toLowerCase().replaceAll(/\s+/g, '-');
    this.router.navigate(['/personal', slug]);
  }
}
