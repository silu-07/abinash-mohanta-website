import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ReviewsComponent } from '../reviews.component';
import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
  imports: [CommonModule, ReviewsRoutingModule, ReviewsComponent, SharedModule],
})
export class ReviewsModule {}
