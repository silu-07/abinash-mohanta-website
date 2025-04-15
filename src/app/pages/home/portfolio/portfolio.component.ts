import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  canScrollLeft = false;
  canScrollRight = true;

  portfolioCards = [
    {
      title: 'Project One',
      desc: 'A short description of project one goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 1'
    },
    {
      title: 'Project Two',
      desc: 'A short description of project two goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 2'
    },
    {
      title: 'Project Three',
      desc: 'A short description of project three goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 3'
    },
    {
      title: 'Project Four',
      desc: 'A short description of project four goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 4'
    },
    {
      title: 'Project Five',
      desc: 'A short description of project five goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 5'
    },
    {
      title: 'Project Six',
      desc: 'A short description of project six goes here.',
      img: 'https://via.placeholder.com/200x120',
      alt: 'Project 6'
    }
  ];

  scrollRight(row: HTMLElement) {
    const card = row.querySelector('.portfolio-card') as HTMLElement;
    if (!card) return;
    const cardStyle = getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseFloat(cardStyle.marginRight || '0') + parseFloat(cardStyle.marginLeft || '0');
    const visibleCards = Math.floor(row.offsetWidth / card.offsetWidth) || 1;
    const scrollAmount = cardWidth * visibleCards;
    row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      this.updateScrollButtons(row);
      this.focusFirstVisibleCard(row);
    }, 350);
  }

  scrollLeft(row: HTMLElement) {
    const card = row.querySelector('.portfolio-card') as HTMLElement;
    if (!card) return;
    const cardStyle = getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseFloat(cardStyle.marginRight || '0') + parseFloat(cardStyle.marginLeft || '0');
    const visibleCards = Math.floor(row.offsetWidth / card.offsetWidth) || 1;
    const scrollAmount = cardWidth * visibleCards;
    row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      this.updateScrollButtons(row);
      this.focusFirstVisibleCard(row);
    }, 350);
  }

  focusFirstVisibleCard(row: HTMLElement) {
    const cards = Array.from(row.querySelectorAll('.portfolio-card')) as HTMLElement[];
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      if (rect.left >= rowRect.left && rect.right <= rowRect.right) {
        card.focus();
        break;
      }
    }
  }

  onRowScroll(row: HTMLElement) {
    this.updateScrollButtons(row);
  }

  updateScrollButtons(row: HTMLElement) {
    const tolerance = 2; // px, to account for floating point errors
    this.canScrollLeft = row.scrollLeft > tolerance;
    this.canScrollRight = row.scrollLeft + row.offsetWidth < row.scrollWidth - tolerance;
  }

}

