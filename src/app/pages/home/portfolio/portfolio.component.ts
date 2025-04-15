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
    row.scrollBy({ left: 340, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(row), 350);
  }

  scrollLeft(row: HTMLElement) {
    row.scrollBy({ left: -340, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(row), 350);
  }

  onRowScroll(row: HTMLElement) {
    this.updateScrollButtons(row);
  }

  updateScrollButtons(row: HTMLElement) {
    this.canScrollLeft = row.scrollLeft > 0;
    this.canScrollRight = row.scrollLeft + row.offsetWidth < row.scrollWidth - 1;
  }

}

