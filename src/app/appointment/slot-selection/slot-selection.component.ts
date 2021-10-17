import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes.constants';
import { BasketService } from 'src/app/services/basket/basket.service';
import { Slot } from 'src/app/services/slots/model';
import { SlotsService } from 'src/app/services/slots/slots.service';

const SLOT_INCREMENT = 5;

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss'],
})
export class SlotSelectionComponent {
  public count = SLOT_INCREMENT;
  public slots$ = this.slotsService.getSlots();

  constructor(
    private slotsService: SlotsService,
    private basketService: BasketService,
    private router: Router,
  ) {}

  public loadMoreSlots() {
    this.count += SLOT_INCREMENT;
  }

  public selectSlot(slot: Slot) {
    this.basketService.selectSlot(slot);
    this.router.navigate([ROUTES.WORKERS]);
  }
}
