import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { CommercialComponent } from './pages/commercial/commercial.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to 'home'
  { path: 'home', component: HomeComponent }, // Define the home route
  { path: 'about', component: AboutComponent }, // Define the about route
  { path: 'contact', component: ContactComponent }, // Define the contact route
  { path: 'personal', component: PersonalComponent }, // Define the personal route
  { path: 'commercial', component: CommercialComponent }, // Define the commercial route
  { path: 'reviews', component: ReviewsComponent }, // Define the reviews route
  { path: '**', redirectTo: 'home' } // Redirect unknown paths to 'home'
];