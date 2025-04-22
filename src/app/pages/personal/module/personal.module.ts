import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { PersonalComponent } from '../personal.component';
import { PersonalRoutingModule } from './personal-routing.module';

@NgModule({
  imports: [CommonModule, PersonalRoutingModule, PersonalComponent, SharedModule],
})
export class PersonalModule {}
