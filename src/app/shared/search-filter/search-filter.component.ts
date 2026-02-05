import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { dropdownAnimation } from '../../animations/dropdown.animations';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  animations: [...dropdownAnimation]
})

export class SearchFilterComponent {
  @Input() placeholder: string = '';
  @Input() placeholderList: string[] = [];
  @Input() searchTerm: string = '';
  @Input() selectedTitles: string[] = [];
  @Input() uniqueTitles: string[] = [];
  @Input() showDropdown: boolean = false;
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() selectedTitlesChange = new EventEmitter<string[]>();
  @Output() showDropdownChange = new EventEmitter<boolean>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() toggleTitle = new EventEmitter<string>();
  @Output() outsideClick = new EventEmitter<Event>();

  isAtBottom = true;  // Always at bottom
  showAtBottom = true; // Always show at bottom
  dropdownDirection: 'up' | 'down' = 'up'; // Always open upward
  private placeholderInterval: any;
  private placeholderIndex: number = 0;
  private lastPlaceholderList: string[] = [];

  ngOnInit() {
    this.dropdownDirection = 'up'; // Always open upward since filter is at bottom
    this.setupPlaceholderCycling();
  }

  ngOnChanges() {
    this.setupPlaceholderCycling();
  }

  ngOnDestroy() {
    if (this.placeholderInterval) {
      clearInterval(this.placeholderInterval);
    }
  }

  setupPlaceholderCycling() {
    if (this.placeholderInterval) {
      clearInterval(this.placeholderInterval);
      this.placeholderInterval = null;
    }
    if (this.placeholderList && this.placeholderList.length > 0) {
      if (this.lastPlaceholderList !== this.placeholderList) {
        this.placeholderIndex = 0;
        this.lastPlaceholderList = this.placeholderList;
      }
      this.placeholder = this.placeholderList[this.placeholderIndex];
      this.placeholderInterval = setInterval(() => {
        this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderList.length;
        this.placeholder = this.placeholderList[this.placeholderIndex];
      }, 3000);
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Filter always stays at bottom - no position change needed
    // Keep dropdown direction as 'up' since filter is at bottom
    this.dropdownDirection = 'up';
  }

  onSearchTermChange(value: string) {
    this.searchTermChange.emit(value);
  }

  onClearSearch() {
    this.searchTermChange.emit('');
  }

  onDropdownToggle() {
    this.showDropdownChange.emit(!this.showDropdown); // Toggle dropdown
  }

  onClearAll() {
    this.clearAll.emit();
    
    // Smooth scroll to top when filters are cleared while at bottom
    if (this.isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onToggleTitle(title: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.toggleTitle.emit(title);
    
    // Smooth scroll to top when filter is selected while at bottom
    if (this.isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onOutsideClick(event: Event, dropdownContainer: HTMLElement) {
    if (this.showDropdown && dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
      this.outsideClick.emit(event);
    }
  }
}
