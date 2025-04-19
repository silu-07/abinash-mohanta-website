import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

export const cardGridAnimation = [
  trigger('cardGrid', [
    transition(':enter', []), // no animation on grid enter
    transition('* => *', [
      // Animate each card as it enters
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(40px)' }),
          stagger(80, [
            animate('500ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'none' }))
          ])
        ],
        { optional: true }
      )
    ])
  ]),
  trigger('cardItem', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(40px)' }),
      animate('500ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'none' }))
    ])
  ])
];
