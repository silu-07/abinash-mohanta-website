import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const cardGridAnimation = [
  trigger('cardGridAnimation', [
    transition(':enter', [
      query('.card', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger(100, [
          animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
      ], { optional: true })
    ])
  ])
];

// Add this trigger for per-card animation
export const cardAnimation = [
  trigger('cardAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
    ]),
    transition(':leave', [
      animate('200ms ease', style({ opacity: 0, transform: 'translateY(30px)' }))
    ])
  ])
];