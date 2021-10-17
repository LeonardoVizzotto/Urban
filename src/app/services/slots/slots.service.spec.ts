import { HttpClientMock } from 'src/app/test/HttpClient.mock';
import { SlotsService } from './slots.service';

describe('SlotsService', () => {
  let service = new SlotsService(HttpClientMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
