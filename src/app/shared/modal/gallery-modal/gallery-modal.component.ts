import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})

export class GalleryModalComponent implements OnInit, OnDestroy {
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
  private lastKeyTime = 0;
  private fullscreenHandler = () => { this.isFullScreen = !!document.fullscreenElement; };

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', this.fullscreenHandler);
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

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.open) return;
    const now = Date.now();
    if (now - this.lastKeyTime < 150) return;
    this.lastKeyTime = now;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Escape':
        event.preventDefault();
        this.onClose();
        break;
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isIOS) this.toggleFullScreen();
        break;
    }
  }


  public onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    this.isPortrait = img.naturalHeight > img.naturalWidth;
    this.isLandscape = img.naturalWidth > img.naturalHeight;
  }

  public onImageTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchTarget = 'image';
    }
  }

  public onImageTouchMove(event: TouchEvent): void {
    if (this.touchTarget === 'image' && event.touches.length === 1) {
      this.touchMoveX = event.touches[0].clientX;
    }
  }

  public onImageTouchEnd(_event: TouchEvent): void {
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

  public onThumbsTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchTarget = 'thumbs';
    }
  }

  public onThumbsTouchMove(event: TouchEvent): void {
    if (this.touchTarget === 'thumbs' && event.touches.length === 1) {
      const thumbs = document.querySelector('.gallery-modal-thumbnails') as HTMLElement;
      if (thumbs && this.touchStartX !== null) {
        const delta = event.touches[0].clientX - this.touchStartX;
        thumbs.scrollLeft -= delta;
        this.touchStartX = event.touches[0].clientX;
      }
    }
  }

  public onThumbsTouchEnd(_event: TouchEvent): void {
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

  public prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    setTimeout(() => this.scrollThumbnailIntoView(), 0);
  }

  public next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
    setTimeout(() => this.scrollThumbnailIntoView(), 0);
  }

  public select(index: number): void {
    this.currentIndex = index;
    setTimeout(() => this.scrollThumbnailIntoView(), 0);
  }

  public onClose(): void {
    this.close.emit();
  }

  public onThumbnailsWheel(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  private scrollThumbnailIntoView(): void {
    const thumbnailsContainer = document.querySelector('.gallery-modal-thumbnails');
    const activeThumb = document.querySelector('.gallery-modal-thumbnails img.active');
    if (thumbnailsContainer && activeThumb) {
      const containerRect = thumbnailsContainer.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const scrollLeft = thumbRect.left - containerRect.left -
        (containerRect.width / 2) + (thumbRect.width / 2);
      thumbnailsContainer.scrollTo({
        left: thumbnailsContainer.scrollLeft + scrollLeft,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.removeEventListener('fullscreenchange', this.fullscreenHandler);
  }
}
