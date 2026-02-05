import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialComponent } from '../commercial.component';
import { CommercialDetailComponent } from '../commercial-detail/commercial-detail.component';

const routes: Routes = [
  { path: '', component: CommercialComponent },
  { path: ':id', component: CommercialDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialRoutingModule {}
