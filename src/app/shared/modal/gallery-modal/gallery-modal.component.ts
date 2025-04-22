import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {
  isFullScreen = false;

  ngOnInit(): void {}

  @Input() images: string[] = [];
  @Input() open = false;
  @Input() initialIndex = 0;
  @Output() close = new EventEmitter<void>();

  currentIndex = 0;

  toggleFullScreen() {
    const modal = document.querySelector('.gallery-modal') as HTMLElement;
    if (!modal) return;

    if (!this.isFullScreen) {
      if (modal.requestFullscreen) {
        modal.requestFullscreen();
      } else if ((modal as any).webkitRequestFullscreen) {
        (modal as any).webkitRequestFullscreen();
      } else if ((modal as any).msRequestFullscreen) {
        (modal as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  constructor() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });
  }

  ngOnChanges() {
    if (this.open) {
      this.currentIndex = this.initialIndex;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  select(index: number) {
    this.currentIndex = index;
  }

  onClose() {
    this.close.emit();
  }
}
