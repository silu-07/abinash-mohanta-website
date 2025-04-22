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

  currentIndex = 0;

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
