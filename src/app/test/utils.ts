import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SlotsService } from '../services/slots/slots.service';
import { WorkersService } from '../services/workers/workers.service';

export function mockProviders() {
  const slotsService = {
    getSlots: jest.fn().mockReturnValue(
      of([
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
      ])
    ),
  };

  let workersService = {
    getAvailableWorkersDataBySlot: jest.fn().mockReturnValue(
      of([
        {
          id: 1,
          name: 'John Doe',
          rating: '2.9',
          isNew: false,
          profilePicture: {
            large: 'https://randomuser.me/api/portraits/men/22.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/22.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/22.jpg',
          },
        },
      ])
    ),
  };

  const router = {
    navigate: jest.fn(),
  };

  return {
    slotsService,
    router,
    providers: [
      {
        provide: SlotsService,
        useValue: slotsService,
      },
      {
        provide: WorkersService,
        useValue: workersService,
      },
      { provide: Router, useValue: router },
    ],
  };
}
