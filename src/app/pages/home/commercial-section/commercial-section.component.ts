import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-commercial-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial-section.component.html',
  styleUrl: './commercial-section.component.scss'
})
export class CommercialSectionComponent {
  photographyImages = [
    { src: 'carosuel-home/image1.JPG', alt: 'Landscape', title: 'Landscape' },
    { src: 'carosuel-home/image2.JPG', alt: 'Portrait', title: 'Portrait' },
    { src: 'carosuel-home/image3.JPG', alt: 'Wildlife', title: 'Wildlife' },
    { src: 'carosuel-home/image1.JPG', alt: 'Urban', title: 'Urban' }
  ];
  
  onViewMore() {
    // Example: Navigate or show more images
    // You can implement router navigation or load more logic here
    window.location.href = '/gallery'; // Change to your gallery route if needed
  }
}
