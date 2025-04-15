import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { portfolioCards } from '../config/portfolio-cards.config';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('portfolioRow', { static: true }) portfolioRow!: ElementRef<HTMLDivElement>;

  public portfolioCards = portfolioCards;

  canScrollLeft = false;
  canScrollRight = true;
  private isDragging = false;
  private startX = 0;
  private dragScrollLeft = 0;

  ngAfterViewInit(): void {
    const row = this.portfolioRow.nativeElement;
    // Mouse events
    row.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      row.classList.add('dragging');
      this.startX = e.pageX - row.offsetLeft;
      this.dragScrollLeft = row.scrollLeft;
    });
    row.addEventListener('mouseleave', () => {
      this.isDragging = false;
      row.classList.remove('dragging');
    });
    row.addEventListener('mouseup', () => {
      this.isDragging = false;
      row.classList.remove('dragging');
    });
    row.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - this.startX) * 1.2;
      row.scrollLeft = this.dragScrollLeft - walk;
    });
    // Touch events
    row.addEventListener('touchstart', (e: TouchEvent) => {
      this.isDragging = true;
      this.startX = e.touches[0].pageX - row.offsetLeft;
      this.dragScrollLeft = row.scrollLeft;
    });
    row.addEventListener('touchend', () => {
      this.isDragging = false;
    });
    row.addEventListener('touchmove', (e: TouchEvent) => {
      if (!this.isDragging) return;
      const x = e.touches[0].pageX - row.offsetLeft;
      const walk = (x - this.startX) * 1.2;
      row.scrollLeft = this.dragScrollLeft - walk;
    });
  }

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

