import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})

export class GalleryModalComponent {
  @Input() images: string[] = [];
  @Input() open = false;
  @Input() initialIndex = 0;
  @Output() close = new EventEmitter<void>();
  public currentIndex = 0;
  public isPortrait = false;
  public isLandscape = false;
  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  private isFullScreen = false;
  private touchStartX: number | null = null;
  private touchMoveX: number | null = null;
  private touchTarget: 'image' | 'thumbs' | null = null;

  constructor() { document.addEventListener('fullscreenchange', () => { this.isFullScreen = !!document.fullscreenElement; }); }

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

  public onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.isPortrait = img.naturalHeight > img.naturalWidth;
    this.isLandscape = img.naturalWidth > img.naturalHeight;
  }

  public onImageTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchTarget = 'image';
    }
  }

  public onImageTouchMove(event: TouchEvent) {
    if (this.touchTarget === 'image' && event.touches.length === 1) {
      this.touchMoveX = event.touches[0].clientX;
    }
  }

  public onImageTouchEnd(event: TouchEvent) {
    if (this.touchTarget === 'image' && this.touchStartX !== null && this.touchMoveX !== null) {
      const dx = this.touchMoveX - this.touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) this.next();
        if (dx > 0) this.prev();
      }
    }
    this.touchStartX = null;
    this.touchMoveX = null;
    this.touchTarget = null;
  }

  public onThumbsTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchTarget = 'thumbs';
    }
  }

  public onThumbsTouchMove(event: TouchEvent) {
    if (this.touchTarget === 'thumbs' && event.touches.length === 1) {
      const thumbs = document.querySelector('.gallery-modal-thumbnails') as HTMLElement;
      if (thumbs && this.touchStartX !== null) {
        const delta = event.touches[0].clientX - this.touchStartX;
        thumbs.scrollLeft -= delta;
        this.touchStartX = event.touches[0].clientX;
      }
    }
  }
  public onThumbsTouchEnd(event: TouchEvent) {
    this.touchStartX = null;
    this.touchTarget = null;
  }

  public toggleFullScreen() {
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

  public prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  public next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  public select(index: number) {
    this.currentIndex = index;
  }

  public onClose() {
    this.close.emit();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}
