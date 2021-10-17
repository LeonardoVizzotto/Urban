import { Component, HostBinding, Input, OnInit } from '@angular/core';

export type Small = 'small';
export type Medium = 'medium';
export type Large = 'large';

export type Size = Small | Medium | Large;

@Component({
  selector: 'app-spacer',
  template: '',
  styleUrls: ['./spacer.component.scss'],
})
export class SpacerComponent implements OnInit {
  @Input() size: Size;
  @HostBinding('attr.aria-hidden')
  private ariaHidden = true;

  @HostBinding('class') private hostClass: {
    [key: string]: boolean;
  } = {};

  constructor() {}

  public ngOnInit(): void {
    this.addClass(`-size-${this.size}`);
  }

  private addClass(className: string): void {
    this.hostClass[className] = true;
  }
}
