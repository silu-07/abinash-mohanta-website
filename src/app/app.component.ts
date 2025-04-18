import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { SecondHeaderComponent } from "./layout/second-header/second-header/second-header.component";
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent, SecondHeaderComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('1200ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'abinash-mohanta-website';

  progress = 0;
  progressVisible = false;
  progressTimer: any = null;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showProgressBar();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.completeProgressBar();
      }
    });
  }

  showProgressBar() {
    this.progress = 0;
    this.progressVisible = true;
    this.increaseProgress();
  }

  increaseProgress() {
    if (this.progress < 90) {
      this.progress += Math.random() * 10 + 5;
      this.progress = Math.min(this.progress, 90);
      this.progressTimer = setTimeout(() => this.increaseProgress(), 200);
    }
  }

  completeProgressBar() {
    this.progress = 100;
    setTimeout(() => {
      this.progressVisible = false;
      this.progress = 0;
      if (this.progressTimer) {
        clearTimeout(this.progressTimer);
        this.progressTimer = null;
      }
    }, 400);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}

