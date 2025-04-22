import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-search-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  animations: [
    trigger('dropdownMenu', [
      state('open', style({ opacity: 1, display: 'block' })),
      state('closed', style({ opacity: 0, display: 'none' })),
      transition('open <=> closed', [
        animate('200ms ease-in-out')
      ]),
    ])
  ]
})
export class SearchFilterComponent {
  isAtBottom = false;
  showAtBottom = false;
  dropdownDirection: 'up' | 'down' = 'down';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const shouldBeAtBottom = window.scrollY > 400;
    if (shouldBeAtBottom && !this.isAtBottom) {
      this.isAtBottom = true;
      setTimeout(() => this.showAtBottom = true, 10); // allow DOM update
    } else if (!shouldBeAtBottom && this.isAtBottom) {
      this.showAtBottom = false;
      setTimeout(() => this.isAtBottom = false, 350); // match CSS transition
    }
    this.dropdownDirection = shouldBeAtBottom ? 'up' : 'down';
  }

  ngOnInit() {
    // Set initial direction
    this.dropdownDirection = window.scrollY > 440 ? 'up' : 'down';
  }
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
  }

  onToggleTitle(title: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.toggleTitle.emit(title);
  }

  onOutsideClick(event: Event, dropdownContainer: HTMLElement) {
    if (this.showDropdown && dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
      this.outsideClick.emit(event);
    }
  }
}
