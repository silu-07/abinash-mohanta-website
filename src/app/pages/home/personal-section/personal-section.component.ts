import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-section.component.html',
  styleUrl: './personal-section.component.scss'
})
export class PersonalSectionComponent {
  photographyImages = [
    { src: 'carosuel-home/1.JPG', alt: 'Landscape', title: 'Landscape' },
    { src: 'carosuel-home/2.JPG', alt: 'Portrait', title: 'Portrait' },
    { src: 'carosuel-home/3.JPG', alt: 'Wildlife', title: 'Wildlife' },
    { src: 'carosuel-home/1.JPG', alt: 'Urban', title: 'Urban' }
  ];
  
  onViewMore() {
    // Example: Navigate or show more images
    // You can implement router navigation or load more logic here
    window.location.href = '/gallery'; // Change to your gallery route if needed
  }
}
