import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BasketService } from '../basket/basket.service';
import { Slot } from './model';

interface GetSlots {
  slots: Slot[];
}

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  private url = `${environment.API}/slots.json`;

  constructor(private http: HttpClient, private basketService: BasketService) {}

  public getSlots() {
    return combineLatest([
      this.http.get<GetSlots>(this.url).pipe(map(({ slots }) => slots)),
      this.basketService.appointments$,
    ]).pipe(
      map(([slots, appointments]) => {
        return slots.filter(
          (slot) =>
            !appointments.some(({ slot: _slot }) => slot.id === _slot.id)
        );
      })
    );
  }
}
