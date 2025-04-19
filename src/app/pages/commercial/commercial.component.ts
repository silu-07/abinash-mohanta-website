import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { comImages } from './images-commercial';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commercial.component.html',
  styleUrl: './commercial.component.scss'
})
export class CommercialComponent {
  searchTerm: string = '';
  selectedTitles: string[] = [];
  showDropdown: boolean = false;

  constructor(private router: Router) { }

  onOutsideClick(event: MouseEvent, dropdownRef: HTMLElement) {
    if (this.showDropdown && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      this.showDropdown = false;
    }
  }

  goToProject(item: { link: string }) {
    this.router.navigate([item.link]);
  }

  toggleTitleSelection(title: string) {
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

  get uniqueTitles(): string[] {
    return Array.from(new Set(comImages
      .map((item: { title: string }) => item.title)
      .filter((title: string) => !!title)
    )).sort();
  }

  get filteredCards() {
    return comImages.filter((item: { title: string }) => {
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
