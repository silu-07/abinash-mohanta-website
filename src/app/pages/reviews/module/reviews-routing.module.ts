import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from '../reviews.component';

const routes: Routes = [
  { path: '', component: ReviewsComponent, title: 'Reviews | Memories By Abinash' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
