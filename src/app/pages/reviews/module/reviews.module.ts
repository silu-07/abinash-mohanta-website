import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from '../reviews.component';
import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
  imports: [CommonModule, ReviewsRoutingModule, ReviewsComponent],
})
export class ReviewsModule {}
