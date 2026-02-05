import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InViewportDirective } from '../../../shared/directives/in-viewport.directive';
import { MoveToTopComponent } from '../../../shared/movetotop/movetotop.component';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { GalleryItem } from './gallery-item.interface';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, InViewportDirective, MoveToTopComponent, SearchFilterComponent],
  templateUrl: './gallery-grid.component.html',
  styleUrl: './gallery-grid.component.scss'
})
export class GalleryGridComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: GalleryItem[] = [];
  @Input() detailRoutePrefix: string = '/detail';
  
  @Output() itemClick = new EventEmitter<GalleryItem>();

  // Store randomized classes for each item
  private cardClasses: string[] = [];

  // Search filter state
  searchTerm: string = '';
  selectedTitles: string[] = [];
  showDropdown: boolean = false;
  isDesktop: boolean = window.innerWidth >= 600;

  private readonly resizeHandler = this.updateIsDesktop.bind(this);

  get placeholderList(): string[] {
    return this.items.map(p => p.title);
  }

  getCardClass(index: number): string {
    return this.cardClasses[index] || 'normal';
  }

  ngOnInit(): void {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length > 0) {
      this.randomizeLayout();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  // Smart randomize layout - avoids gaps by balancing wide/tall items
  private randomizeLayout(): void {
    const totalItems = this.items.length;
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

  updateIsDesktop(): void {
    this.isDesktop = window.innerWidth >= 600;
  }

  onItemClick(item: GalleryItem): void {
    this.itemClick.emit(item);
  }

  // Search filter methods
  onShowDropdownChange(val: boolean): void {
    this.showDropdown = val;
  }

  onOutsideClick(event: Event, dropdownRef: HTMLElement): void {
    if (this.showDropdown && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      this.showDropdown = false;
    }
  }

  toggleTitleSelection(title: string, event?: Event): void {
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

  clearAllFilters(): void {
    this.selectedTitles = [];
    this.showDropdown = false;
  }

  get uniqueTitles(): string[] {
    return Array.from(new Set(this.items
      .map(item => item.title)
      .filter(title => !!title)
    )).sort((a, b) => a.localeCompare(b));
  }

  get filteredItems(): GalleryItem[] {
    return this.items.filter(item => {
      const matchesTitle =
        this.selectedTitles.length === 0 || this.selectedTitles.includes(item.title);
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesTitle && matchesSearch;
    });
  }

  isActiveFilter(item: GalleryItem): boolean {
    return this.isDesktop && this.selectedTitles.length > 0 && this.selectedTitles.includes(item.title);
  }

  isActiveSearch(item: GalleryItem): boolean {
    return this.isDesktop && !!this.searchTerm && item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const escaped = this.searchTerm.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'ig');
    return text.replaceAll(re, '<mark class="search-highlight">$1</mark>');
  }

  trackByFn(_index: number, item: GalleryItem): string {
    return item.title;
  }
}
