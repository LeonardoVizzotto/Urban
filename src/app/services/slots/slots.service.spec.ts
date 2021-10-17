import { of } from 'rxjs';
import { HttpClientMock } from 'src/app/test/HttpClient.mock';
import { SlotsService } from './slots.service';

describe('SlotsService', () => {
  HttpClientMock.get.mockReturnValue(
    of({
      slots: [
        {
          id: 1,
          localisedTime: '12:00',
          price: '£81.00',
        },
        {
          id: 2,
          localisedTime: '12:30',
          price: '£81.00',
        },
        {
          id: 3,
          localisedTime: '13:00',
          price: '£87.00',
        },
      ],
    })
  );
  let service = new SlotsService(HttpClientMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map correctly the http request result', (done) => {
    service.getSlots().subscribe((slots) => {
      expect(slots).toMatchObject([
        {
          id: 1,
          localisedTime: '12:00',
          price: '£81.00',
        },
        {
          id: 2,
          localisedTime: '12:30',
          price: '£81.00',
        },
        {
          id: 3,
          localisedTime: '13:00',
          price: '£87.00',
        },
      ]);
      done();
    });
  });
});
