import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from '../personal.component';
import { PersonalDetailComponent } from '../personal-detail/personal-detail.component';

const routes: Routes = [
  { path: '', component: PersonalComponent },
  { path: ':id', component: PersonalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
