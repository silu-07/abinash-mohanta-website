import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CommercialComponent } from '../commercial.component';
import { CommercialRoutingModule } from './commercial-routing.module';

@NgModule({
  imports: [CommonModule, CommercialRoutingModule, CommercialComponent, SharedModule],
})
export class CommercialModule {}
