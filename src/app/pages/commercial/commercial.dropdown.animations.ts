import { trigger, transition, style, animate } from '@angular/animations';

export const dropdownAnimation = [
  trigger('dropdownMenu', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-12px) scale(0.98)' }),
      animate('220ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'none' }))
    ]),
    transition(':leave', [
      animate('180ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(-8px) scale(0.98)' }))
    ])
  ])
];
