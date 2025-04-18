import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'Absolutely loved the experience! Highly recommended.'
    },
    {
      name: 'Bob Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4,
      text: 'Great service and friendly staff.'
    },
    {
      name: 'Cathy Lee',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 5,
      text: 'A wonderful place, will visit again.'
    },
    {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      rating: 3,
      text: 'Good, but there is room for improvement.'
    },
    {
      name: 'Emma Brown',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      rating: 4,
      text: 'Very satisfied with the quality and attention.'
    },
    {
      name: 'Frank Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      rating: 5,
      text: 'Exceptional in every way!'
    }
  ];
}
