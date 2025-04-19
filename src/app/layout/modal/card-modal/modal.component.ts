import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() open: boolean = false;
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() closeModal = new EventEmitter<void>();

  ngOnChanges() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  onClose() {
    this.closeModal.emit();
  }
}
