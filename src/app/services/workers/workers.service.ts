import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { AvailableWorker, Picture, Worker } from './model';

interface GetWorkers {
  workers: Worker[];
}

interface GetAvailableWorkers {
  'available-workers': AvailableWorker[];
}

interface GetRandomProfilePicture {
  results: {
    picture: Picture;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  private workersUrl =
    'https://storage.googleapis.com/urban-technical/workers.json';
  private availableWorkersUrl =
    'https://storage.googleapis.com/urban-technical/available-workers.json';
  constructor(private http: HttpClient) {}

  public getAvailableWorkersDataBySlot(slotId: number) {
    return forkJoin([
      this.getWorkers(),
      this.getAvailableWorkersBySlot(slotId),
    ]).pipe(
      map(([workers, workersIds]) =>
        workers
          .filter(({ id }) => workersIds.includes(id))
          .sort((a, b) => Number(b.rating) - Number(a.rating))
      ),
      switchMap((workers) => {
        const populatedWorkers$ = workers.map((worker) =>
          this.populateWorker(worker)
        );
        return forkJoin(populatedWorkers$);
      })
    );
  }

  private getWorkers() {
    return this.http.get<GetWorkers>(this.workersUrl).pipe(pluck('workers'));
  }

  private getAvailableWorkersBySlot(slotId: number) {
    return this.http.get<GetAvailableWorkers>(this.availableWorkersUrl).pipe(
      mergeMap(({ 'available-workers': availableWorkers }) => availableWorkers),
      filter(({ slot_id }) => slot_id === slotId),
      pluck('availableWorker_ids')
    );
  }

  private populateWorker(worker: Worker) {
    return this.http
      .get<GetRandomProfilePicture>('https://randomuser.me/api/?inc=picture')
      .pipe(
        catchError(() => this.getDefaultUserImage()),
        map((randomUser) => ({
          ...worker,
          profilePicture: randomUser?.results[0]?.picture,
        }))
      );
  }

  private getDefaultUserImage() {
    return of({
      results: [
        {
          picture: {
            large: 'https://randomuser.me/api/portraits/men/22.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/22.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/22.jpg',
          },
        },
      ],
    });
  }
}
