import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { titleFadeAnimation } from '../../animations/second-header-title-fade';

@Component({
  selector: 'app-second-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.scss',
  animations: [...titleFadeAnimation]
})
export class SecondHeaderComponent {
  secondHeaderTitle = 'ABINASH MOHANTA';
  currentTitleKey = 'home';

  private routeTitleMap: { [key: string]: string } = {
    home: 'ABINASH MOHANTA',
    about: 'ABOUT ME',
    contact: 'CONTACT',
    personal: 'PERSONAL WORK',
    commercial: 'COMMERCIAL WORK',
    reviews: ' CLIENT REVIEWS',
  };

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects || event.url;
      const path = url.split('/')[1] || 'home';
      this.currentTitleKey = path;
      this.secondHeaderTitle = this.routeTitleMap[path] || 'ABINASH MOHANTA';
    });
  }
}
