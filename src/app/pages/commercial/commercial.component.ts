import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterComponent } from '../../shared/search-filter/search-filter.component';
import { Router } from '@angular/router';
import { comImages } from './assets/images-commercial';
import { cardGridAnimation, cardAnimation } from '../../animations/card-grid.animations';
import { dropdownAnimation } from '../../animations/dropdown.animations';
import { overlayAnimation } from '../../animations/overlay.animations';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterComponent],
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss'],
  animations: [...cardGridAnimation,...cardAnimation, ...dropdownAnimation, ...overlayAnimation]
})
export class CommercialComponent {
  searchTerm: string = '';
  selectedTitles: string[] = [];
  showDropdown: boolean = false;
  isDesktop: boolean = window.innerWidth >= 600;

  constructor(private router: Router) {
    window.addEventListener('resize', this.updateIsDesktop.bind(this));
  }

  updateIsDesktop() {
    this.isDesktop = window.innerWidth >= 600;
  }

  trackByFn(_index: number, item: any) {
    return item.title; // Or item.id if you have a unique id
  }

  onShowDropdownChange(val: boolean) {
    this.showDropdown = val;
  }

  onOutsideClick(event: Event, dropdownRef: HTMLElement) {
    if (this.showDropdown && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      this.showDropdown = false;
    }
  }

  isActiveFilter(item: any): boolean {
    return this.isDesktop && this.selectedTitles.length > 0 && this.selectedTitles.includes(item.title);
  }

  isActiveSearch(item: any): boolean {
    return this.isDesktop && this.searchTerm && item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  goToProject(item: { link: string }) {
    this.router.navigate([item.link]);
  }

  toggleTitleSelection(title: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.selectedTitles.includes(title)) {
      this.selectedTitles = this.selectedTitles.filter(t => t !== title);
    } else {
      this.selectedTitles = [...this.selectedTitles, title];
    }
  }

  clearAllFilters() {
    this.selectedTitles = [];
    this.showDropdown = false;
  }

  get allImages() {
    return [...comImages]; // Always return a fresh copy
  }

  get uniqueTitles(): string[] {
    return Array.from(new Set(this.allImages
      .map((item: { title: string }) => item.title)
      .filter((title: string) => !!title)
    )).sort();
  }

  get filteredCards() {
    return this.allImages.filter((item: { title: string }) => {
      const matchesTitle =
        this.selectedTitles.length === 0 || this.selectedTitles.includes(item.title);
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesTitle && matchesSearch;
    });
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const escaped = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'ig');
    return text.replace(re, '<mark class="search-highlight">$1</mark>');
  }


}
