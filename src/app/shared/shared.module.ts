import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveToTopComponent } from './movetotop/movetotop.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ModalComponent } from './modal/card-modal/modal.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SecondHeaderComponent } from './second-header/second-header.component';

@NgModule({
  imports: [CommonModule, MoveToTopComponent, ProgressBarComponent, ModalComponent, SearchFilterComponent, SecondHeaderComponent],
  exports: [MoveToTopComponent, ProgressBarComponent, ModalComponent, SearchFilterComponent, SecondHeaderComponent]
})
export class SharedModule {}
