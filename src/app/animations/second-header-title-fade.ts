import { trigger, transition, style, animate } from '@angular/animations';

export const titleFadeAnimation = [
  trigger('titleFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('700ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(20px)' }))
    ])
  ])
];
