import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidenavComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSidenavOpen = false; // Track the state of the sidenav

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen; // Toggle the sidenav state
  }
}
