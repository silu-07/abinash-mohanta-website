import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryGridComponent } from '../shared/gallery-grid/gallery-grid.component';
import { GalleryItem } from '../shared/gallery-grid/gallery-item.interface';
import { PERSONAL_PROJECTS } from '../../data/personal-projects.data';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [GalleryGridComponent],
  template: `
    <app-gallery-grid 
      [items]="items" 
      (itemClick)="onItemClick($event)">
    </app-gallery-grid>
  `
})
export class PersonalComponent {
  items: GalleryItem[] = PERSONAL_PROJECTS;

  constructor(private readonly router: Router) {}

  onItemClick(item: GalleryItem): void {
    const slug = item.title.toLowerCase().replaceAll(/\s+/g, '-');
    this.router.navigate(['/personal', slug]);
  }
}
