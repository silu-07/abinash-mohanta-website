import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  get uniqueTitles(): string[] {
    return Array.from(new Set(this.comImages
      .map(item => item.title)
      .filter(title => !!title)
    )).sort();
  }

  get filteredCards() {
    return this.comImages.filter(item => {
      const matchesTitle =
        this.selectedTitles.length === 0 || this.selectedTitles.includes(item.title);
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesTitle && matchesSearch;
    });
  }
  comImages = [
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: "kid",
      link: '/project1',
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Engagement',
      link: '/project2',
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Marraige',
      link: '/project3',
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Birthday',
      link: 'https://example.com/project2',
      description: 'Stock footage showcasing rich hues and patterns'
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Outdoor',
      link: 'https://example.com/project3',
      description: 'Stock video reflecting the Animals and Influencers trend'
    },
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: "Prewedding",
      link: '/project1',
    },
  ];

  toggleTitleSelection(title: string) {
    const idx = this.selectedTitles.indexOf(title);
    if (idx === -1) {
      this.selectedTitles.push(title);
    } else {
      this.selectedTitles.splice(idx, 1);
    }
  }

  constructor(private router: Router) { }

  goToProject(item: { link: string }) {
    this.router.navigate([item.link]);
  }

}
