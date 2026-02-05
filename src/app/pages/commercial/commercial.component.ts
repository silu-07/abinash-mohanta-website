import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryGridComponent } from '../shared/gallery-grid/gallery-grid.component';
import { GalleryItem } from '../shared/gallery-grid/gallery-item.interface';
import { COMMERCIAL_PROJECTS } from '../../data/commercial-projects.data';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [GalleryGridComponent],
  template: `
    <app-gallery-grid 
      [items]="items" 
      (itemClick)="onItemClick($event)">
    </app-gallery-grid>
  `
})
export class CommercialComponent {
  items: GalleryItem[] = COMMERCIAL_PROJECTS;

  constructor(private readonly router: Router) {}

  onItemClick(item: GalleryItem): void {
    const slug = item.title.toLowerCase().replaceAll(/\s+/g, '-');
    this.router.navigate(['/commercial', slug]);
  }
}
