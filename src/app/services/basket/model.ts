import { Slot } from '../slots/model';
import { Worker } from '../workers/model';

export interface Appointment {
  slot: Slot;
  worker: Worker;
}
