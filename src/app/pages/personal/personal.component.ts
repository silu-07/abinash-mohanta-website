import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { MoveToTopComponent } from "../../shared/movetotop/movetotop.component";
import { SearchFilterComponent } from '../../shared/search-filter/search-filter.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, FormsModule, InViewportDirective, MoveToTopComponent, SearchFilterComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  // Store randomized classes for each item
  private cardClasses: string[] = [];

  // Search filter state
  searchTerm: string = '';
  selectedTitles: string[] = [];
  showDropdown: boolean = false;
  isDesktop: boolean = window.innerWidth >= 600;
  
  get placeholderList(): string[] {
    return this.projects.map(p => p.title);
  }

  projects = [
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: 'Mountain Sunrise',
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Golden Hour',
    },
    {
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      title: 'Portrait Session',
    },
    {
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
      title: 'Creative Flow',
    },
    {
      image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80',
      title: 'Serenity',
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Wanderlust',
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      title: 'Reflections',
    },
    {
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      title: 'Urban Stories',
    },
    {
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      title: 'Forest Dreams',
    },
    {
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      title: 'Valley Views',
    },
    {
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      title: 'Elegance',
    },
    {
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      title: 'Horizon',
    },
    {
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      title: 'Natural Light',
    },
    {
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      title: 'Misty Morning',
    },
    {
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
      title: 'Candid Moments',
    },
    {
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
      title: 'Waterfall',
    },
  ];

  // Returns unique card classes for varied masonry layout
  getCardClass(index: number): string {
    return this.cardClasses[index] || 'normal';
  }

  ngOnInit(): void {
    this.randomizeLayout();
  }

  // Smart randomize layout - avoids gaps by balancing wide/tall items
  private randomizeLayout(): void {
    const totalItems = this.projects.length;
    const classes: string[] = [];
    
    // Limit wide and tall items to avoid gaps
    let wideCount = 0;
    let tallCount = 0;
    const maxWide = Math.floor(totalItems * 0.15); // ~15% wide
    const maxTall = Math.floor(totalItems * 0.25); // ~25% tall
    
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
    
    // Shuffle the array for more randomness
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

  constructor(private readonly router: Router) {
    window.addEventListener('resize', this.updateIsDesktop.bind(this));
  }

  updateIsDesktop() {
    this.isDesktop = window.innerWidth >= 600;
  }

  // Navigate to detail page
  navigateToDetail(project: { title: string; image: string }): void {
    const slug = project.title.toLowerCase().replaceAll(/\s+/g, '-');
    this.router.navigate(['/personal', slug]);
  }

  // Search filter methods
  onShowDropdownChange(val: boolean) {
    this.showDropdown = val;
  }

  onOutsideClick(event: Event, dropdownRef: HTMLElement) {
    if (this.showDropdown && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      this.showDropdown = false;
    }
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

  get uniqueTitles(): string[] {
    return Array.from(new Set(this.projects
      .map(item => item.title)
      .filter(title => !!title)
    )).sort();
  }

  get filteredProjects() {
    return this.projects.filter(item => {
      const matchesTitle =
        this.selectedTitles.length === 0 || this.selectedTitles.includes(item.title);
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesTitle && matchesSearch;
    });
  }

  isActiveFilter(item: { title: string }): boolean {
    return this.isDesktop && this.selectedTitles.length > 0 && this.selectedTitles.includes(item.title);
  }

  isActiveSearch(item: { title: string }): boolean {
    return this.isDesktop && !!this.searchTerm && item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const escaped = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'ig');
    return text.replace(re, '<mark class="search-highlight">$1</mark>');
  }
}
