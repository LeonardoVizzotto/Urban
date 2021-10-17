import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slot } from '../slots/model';
import { Worker } from '../workers/model';
import { Appointment } from './model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _appointments: Appointment[] = [];
  private _selectedSlot?: Slot;
  private _selectedWorker?: Worker;

  private appointmentsSubject$ = new BehaviorSubject<Appointment[]>(
    this._appointments
  );
  public appointments$ = this.appointmentsSubject$.asObservable();

  constructor() {
  }

  public selectSlot(slot: Slot) {
    this._selectedSlot = slot;
  }

  public get selectedSlot() {
    return this._selectedSlot;
  }

  public selectWorker(worker: Worker) {
    this._selectedWorker = worker;
  }

  public reset() {
    this._selectedSlot = void 0;
    this._selectedWorker = void 0;
  }

  public get selectedWorker() {
    return this._selectedWorker;
  }

  public bookAppointment() {
    if (!this.selectedSlot || !this.selectedWorker) {
      return;
    }

    this._appointments.push({
      slot: this.selectedSlot,
      worker: this.selectedWorker,
    });

    this.appointmentsSubject$.next([...this._appointments]);
    this.reset();
  }

  public removeAppointment(index: number) {
    this._appointments.splice(index, 1);
    this.appointmentsSubject$.next([...this._appointments]);
  }
}
