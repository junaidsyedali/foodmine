import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css',
})
export class DefaultButtonComponent {
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;

  @Output() onClick = new EventEmitter();
}
