import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commercial-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commercial-modal.component.html',
  styleUrls: ['./commercial-modal.component.scss']
})
export class CommercialModalComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() open: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
