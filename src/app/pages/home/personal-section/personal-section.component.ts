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
    { src: 'carosuel-home/image1.jpg', alt: 'Landscape', title: 'Landscape' },
    { src: 'carosuel-home/image2.jpg', alt: 'Portrait', title: 'Portrait' },
    { src: 'carosuel-home/image3.jpg', alt: 'Wildlife', title: 'Wildlife' },
    { src: 'carosuel-home/image1.jpg', alt: 'Urban', title: 'Urban' }
  ];
  
  onViewMore() {
    // Example: Navigate or show more images
    // You can implement router navigation or load more logic here
    window.location.href = '/gallery'; // Change to your gallery route if needed
  }
}
