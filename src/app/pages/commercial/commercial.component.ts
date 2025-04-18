import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../layout/card-modal/modal.component';

@Component({
  selector: 'app-commercial',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './commercial.component.html',
  styleUrl: './commercial.component.scss'
})
export class CommercialComponent {
  commercialImages = [
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: "Curators' picks",
      link: 'https://example.com/project1',
      description: 'Our latest favorite stock footage'
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Colors and textures',
      link: 'https://example.com/project2',
      description: 'Stock footage showcasing rich hues and patterns'
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Creative trends',
      link: 'https://example.com/project3',
      description: 'Stock video reflecting the Animals and Influencers trend'
    },
    {
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: "Curators' picks",
      link: 'https://example.com/project1',
      description: 'Our latest favorite stock footage'
    },
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Colors and textures',
      link: 'https://example.com/project2',
      description: 'Stock footage showcasing rich hues and patterns'
    },
    {
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      title: 'Creative trends',
      link: 'https://example.com/project3',
      description: 'Stock video reflecting the Animals and Influencers trend'
    }
  ];

  modalOpen = false;
  modalImage = '';
  modalTitle = '';
  modalDescription = '';

  openModal(item: any) {
    this.modalImage = item.image;
    this.modalTitle = item.title;
    this.modalDescription = item.description;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
