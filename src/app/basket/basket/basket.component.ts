import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes.constants';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  public appointments$ = this.basketService.appointments$;
  constructor(private basketService: BasketService, private router: Router) {}

  public removeAppointment(index: number) {
    this.basketService.removeAppointment(index);
  }

  public startBooking() {
    this.router.navigate([ROUTES.SLOTS]);
  }
}
