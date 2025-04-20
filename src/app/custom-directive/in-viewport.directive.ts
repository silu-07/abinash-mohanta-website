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
          this.ngZone.run(() => {
            this.isInViewport = entry.isIntersecting;
            this.inViewport.emit(entry.isIntersecting);
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'in-viewport');
            } else {
              this.renderer.removeClass(this.el.nativeElement, 'in-viewport');
            }
          });
        });
      }, { threshold: 0.1 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
