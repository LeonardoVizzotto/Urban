import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 2em 0;
      }
    </style>
    <ng-content></ng-content>
  `,
})
export class ContainerComponent {}
