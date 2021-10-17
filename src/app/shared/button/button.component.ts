import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type?: 'submit' | 'button' = 'button';
  @Input() disabled?: boolean;
  @Input() appearance?:
    | 'primary'
    | 'primary-ghost'
    | 'secondary'
    | 'secondary-ghost';

  @Output() onClick = new EventEmitter();
  constructor() {}
}
