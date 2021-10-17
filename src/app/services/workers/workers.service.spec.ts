import { HttpClientMock } from 'src/app/test/HttpClient.mock';

import { WorkersService } from './workers.service';

describe('WorkersService', () => {
  let service = new WorkersService(HttpClientMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
