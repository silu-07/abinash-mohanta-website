import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isOpen = false; // Input to control visibility
  @Output() close = new EventEmitter<void>(); // Event to notify parent to close sidenav

  constructor(private router: Router) {}

  closeSidenav() {
    this.isOpen = false; // Close the sidenav
    this.close.emit(); // Emit close event
  }

  onLinkClick() {
    this.closeSidenav(); // Close the sidenav when a link is clicked
  }

  onOverlayClick() {
    this.closeSidenav(); // Close the sidenav when clicking outside
  }
}