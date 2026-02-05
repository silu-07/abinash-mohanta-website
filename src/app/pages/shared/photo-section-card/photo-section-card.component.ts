import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface PhotoItem {
  src: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-photo-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-section-card.component.html',
  styleUrl: './photo-section-card.component.scss'
})
export class PhotoSectionCardComponent {
  @Input() sectionTag: string = 'Portfolio';
  @Input() sectionTitle: string = 'Photography';
  @Input() sectionDescription: string = '';
  @Input() photos: PhotoItem[] = [];
  @Input() buttonText: string = 'Explore Gallery';
  
  @Output() viewMore = new EventEmitter<void>();
  @Output() photoClick = new EventEmitter<PhotoItem>();

  onViewMoreClick(): void {
    this.viewMore.emit();
  }

  onPhotoClick(photo: PhotoItem): void {
    this.photoClick.emit(photo);
  }
}
