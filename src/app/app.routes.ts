import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to 'home'
  { path: 'home', component: HomeComponent }, // Define the home route
  { path: 'about', component: AboutComponent }, // Define the about route
  { path: 'contact', component: ContactComponent }, // Define the contact route
  { path: '**', redirectTo: 'home' } // Redirect unknown paths to 'home'
];