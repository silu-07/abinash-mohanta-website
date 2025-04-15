import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movetotop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movetotop.component.html',
  styleUrl: './movetotop.component.scss'
})
export class MoveToTopComponent {
  showScrollTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Use both window.pageYOffset and document.documentElement.scrollTop for compatibility
    const yOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (yOffset > 50) {
      this.showScrollTop = true;
    } else {
      this.showScrollTop = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
