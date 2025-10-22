import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialComponent } from '../commercial.component';

const routes: Routes = [
  { path: '', component: CommercialComponent, title: 'Commercial Projects | Memories By Abinash' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialRoutingModule {}
