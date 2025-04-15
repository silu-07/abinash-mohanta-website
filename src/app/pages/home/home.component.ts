import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, PortfolioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
