import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveToTopComponent } from '../layout/movetotop/movetotop.component';

@NgModule({
  imports: [CommonModule, MoveToTopComponent],
  exports: [MoveToTopComponent]
})
export class SharedModule {}
