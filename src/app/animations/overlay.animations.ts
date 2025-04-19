import { trigger, transition, style, animate } from '@angular/animations';

export const overlayAnimation = [
  trigger('overlayFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(16px) scale(0.97)' }),
      animate('320ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'none' }))
    ]),
    transition(':leave', [
      animate('220ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(12px) scale(0.97)' }))
    ])
  ])
];
