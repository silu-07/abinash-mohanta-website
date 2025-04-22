import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() progress = 0;
  @Input() visible = false;
}
