import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BasketService } from 'src/app/services/basket/basket.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockProviders } from 'src/app/test/utils';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const { providers, router } = mockProviders();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CheckoutComponent],
      providers,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    router.navigate.mockReset();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to SLOTS if no slot has been selected', () => {
    const basketService = TestBed.inject(BasketService);
    basketService.reset();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should match snapshot if a slot and a worker have been selected', () => {
    const basketService = TestBed.inject(BasketService);
    basketService.selectSlot({
      id: 1,
      localisedTime: '12:00',
      price: '£81.00',
    });
    basketService.selectWorker({
      id: 1,
      name: 'John Doe',
      rating: '2.9',
      isNew: false,
      profilePicture: {
        large: 'https://randomuser.me/api/portraits/men/22.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/22.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/22.jpg',
      },
    });
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });
});
