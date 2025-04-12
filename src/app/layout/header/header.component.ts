import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSidenavOpen = false; // Track the state of the sidenav

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen; // Toggle the sidenav state
  }
}
