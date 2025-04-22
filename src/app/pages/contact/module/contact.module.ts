import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ContactComponent } from '../contact.component';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  imports: [CommonModule, ContactRoutingModule, ContactComponent, SharedModule],
})
export class ContactModule {}
