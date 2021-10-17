import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Slot } from './model';

interface GetSlots {
  slots: Slot[];
}

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  private url = 'https://storage.googleapis.com/urban-technical/slots.json';

  constructor(private http: HttpClient) {}

  public getSlots(page = 0) {
    return this.http.get<GetSlots>(this.url).pipe(map(({ slots }) => slots));
  }
}
