import { of, throwError } from 'rxjs';
import { HttpClientMock } from 'src/app/test/HttpClient.mock';

import { WorkersService } from './workers.service';

describe('WorkersService', () => {
  HttpClientMock.get.mockImplementation((url: string) => {
    if (url.includes('/workers.json')) {
      return of({
        workers: [
          {
            id: 1,
            name: 'Maxwell Smith',
            rating: '4.1',
            isNew: false,
          },
          {
            id: 2,
            name: 'Ellouise Riddle',
            rating: '4.6',
            isNew: true,
          },
          {
            id: 3,
            name: 'Asad Reese',
            rating: '2.5',
            isNew: false,
          },
          {
            id: 4,
            name: 'Sabrina Leal',
            rating: '5',
            isNew: false,
          },
        ],
      });
    } else if (url.includes('/available-workers.json')) {
      return of({
        'available-workers': [
          {
            slot_id: 1,
            availableWorker_ids: [1, 2],
          },
          {
            slot_id: 2,
            availableWorker_ids: [3, 4],
          },
        ],
      });
    } else {
      return throwError({});
    }
  });

  let service = new WorkersService(HttpClientMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct list of workers for the selected slot', (done) => {
    service.getAvailableWorkersDataBySlot(1).subscribe((workers) => {
      expect(workers).toHaveLength(2);
      expect(workers.find((w) => w.id === 1)).toBeTruthy();
      expect(workers.find((w) => w.id === 2)).toBeTruthy();
      done();
    });
  });
});
