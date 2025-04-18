import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-second-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.scss',
  animations: [
    trigger('titleFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('700ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
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
