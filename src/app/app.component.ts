import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { SecondHeaderComponent } from "./shared/second-header/second-header.component";
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {

  public progress = 0;
  public progressVisible = false;
  private progressTimer: ReturnType<typeof setTimeout> | null = null;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
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

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      let route = this.activatedRoute;
      let title = '';
      while (route) {
        const snapshot = route.snapshot;
        if (snapshot && snapshot.data && snapshot.data['title']) {
          title = snapshot.data['title'];
        }
        route = route.firstChild!;
      }
      this.titleService.setTitle(title);
    });
  }

  showProgressBar() {
    this.progress = 0;
    this.progressVisible = true;
    this.increaseProgress();
  }

  private increaseProgress() {
    if (this.progress < 90) {
      this.progress += Math.random() * 10 + 5;
      this.progress = Math.min(this.progress, 90);
      this.progressTimer = setTimeout(() => this.increaseProgress(), 200);
    }
  }

  private completeProgressBar() {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.progressTimer) {
      clearTimeout(this.progressTimer);
      this.progressTimer = null;
    }
  }
}