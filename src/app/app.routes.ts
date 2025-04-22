import { Routes, PreloadAllModules, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/module/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/module/about.module').then(m => m.AboutModule)
  },
  {
    
    path: 'contact',
    loadChildren: () => import('./pages/contact/module/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/personal/module/personal.module').then(m => m.PersonalModule)
  },
  {
    path: 'commercial',
    loadChildren: () => import('./pages/commercial/module/commercial.module').then(m => m.CommercialModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/module/reviews.module').then(m => m.ReviewsModule)
  },
  { path: '**', redirectTo: 'home' }
];