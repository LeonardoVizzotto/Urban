import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes.constants';
import { BasketService } from 'src/app/services/basket/basket.service';
import { Slot } from 'src/app/services/slots/model';
import { Worker } from 'src/app/services/workers/model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private basketService: BasketService, private router: Router) {}

  public selectedSlot?: Slot;
  public selectedWorker?: Worker;

  ngOnInit(): void {
    this.selectedSlot = this.basketService.selectedSlot;
    this.selectedWorker = this.basketService.selectedWorker;

    if (!this.selectedSlot || !this.selectedWorker) {
      this.router.navigate([ROUTES.WORKERS]);
    }
  }

  changeTherapist() {
    this.basketService.reset();
    this.router.navigate([ROUTES.SLOTS]);
  }

  bookAppointment() {
    this.basketService.bookAppointment();
    this.router.navigate([ROUTES.BASKET]);
  }
}
