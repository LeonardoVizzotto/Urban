import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Slot } from './model';

interface GetSlots {
  slots: Slot[];
}

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  private url = `${environment.API}/slots.json`;

  constructor(private http: HttpClient) {}

  public getSlots() {
    return this.http.get<GetSlots>(this.url).pipe(map(({ slots }) => slots));
  }
}
