import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PhotoSectionCardComponent, PhotoItem } from '../../shared/photo-section-card/photo-section-card.component';

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
  
  photographyImages: PhotoItem[] = [
    { src: 'carosuel-home/1.JPG', alt: 'Landscape', title: 'Landscape' },
    { src: 'carosuel-home/2.JPG', alt: 'Portrait', title: 'Portrait' },
    { src: 'carosuel-home/3.JPG', alt: 'Wildlife', title: 'Wildlife' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' },
  ];
  
  onViewMore() {
    window.location.href = '/personal';
  }
}
