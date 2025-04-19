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

  goToProject(item: { link: string }) {
    this.router.navigate([item.link]);
  }

  toggleTitleSelection(title: string) {
    const idx = this.selectedTitles.indexOf(title);
    if (idx === -1) {
      this.selectedTitles.push(title);
    } else {
      this.selectedTitles.splice(idx, 1);
    }
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

}
