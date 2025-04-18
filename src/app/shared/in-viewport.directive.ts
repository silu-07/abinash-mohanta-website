import { Directive, ElementRef, EventEmitter, HostBinding, Input, NgZone, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective implements OnInit, OnDestroy {
  @Output() inViewport: EventEmitter<boolean> = new EventEmitter<boolean>();
  @HostBinding('class.in-viewport') isInViewport = false;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef, private ngZone: NgZone, private renderer: Renderer2) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.isInViewport = true;
              this.inViewport.emit(true);
              this.renderer.addClass(this.el.nativeElement, 'in-viewport');
              this.observer?.unobserve(this.el.nativeElement); // Animate only once
            });
          }
        });
      }, { threshold: 0.1 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
