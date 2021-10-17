import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating: string;

  constructor() {}

  get ariaLabel() {
    return `Rating of this worker is ${Math.min(
      Number(this.rating),
      5
    )} out of 5.`;
  }

  get title() {
    return `${Math.min(Number(this.rating), 5)} out of 5.`;
  }
}
