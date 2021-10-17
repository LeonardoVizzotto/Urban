import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() imageHidden?: boolean;

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
