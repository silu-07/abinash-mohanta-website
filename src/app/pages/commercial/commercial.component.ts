import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial.component.html',
  styleUrl: './commercial.component.scss'
})
export class CommercialComponent {
  commercialImages = [
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: 'Commercial Project 1',
      link: 'https://example.com/project1'
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Commercial Project 2',
      link: 'https://example.com/project2'
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Commercial Project 3',
      link: 'https://example.com/project3'
    }
  ];
}
