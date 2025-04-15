import { Component, HostListener } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { CommonModule } from '@angular/common';
import { MoveToTopComponent } from './movetotop/movetotop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, PortfolioComponent, CommonModule, MoveToTopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}

