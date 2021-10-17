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
import { environment } from 'src/environments/environment';
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
  private workersUrl = `${environment.API}/workers.json`;
  private availableWorkersUrl = `${environment.API}/available-workers.json`;
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
      .get<GetRandomProfilePicture>(
        `${environment.PROFILE_PICTURE_API}/?inc=picture`
      )
      .pipe(
        catchError(() => this.getFallbackProfilePicture()),
        map((randomUser) => ({
          ...worker,
          profilePicture: randomUser?.results[0]?.picture,
        }))
      );
  }

  private getFallbackProfilePicture() {
    return of({
      results: [
        {
          picture: {
            large: `${environment.PROFILE_PICTURE_API}/portraits/men/22.jpg`,
            medium: `${environment.PROFILE_PICTURE_API}/portraits/med/men/22.jpg`,
            thumbnail: `${environment.PROFILE_PICTURE_API}/portraits/thumb/men/22.jpg`,
          },
        },
      ],
    });
  }
}
