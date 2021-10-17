import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES } from 'src/app/routes.constants';
import { BasketService } from 'src/app/services/basket/basket.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockProviders } from 'src/app/test/utils';

import { WorkerSelectionComponent } from './worker-selection.component';

describe('WorkerSelectionComponent', () => {
  let component: WorkerSelectionComponent;
  let fixture: ComponentFixture<WorkerSelectionComponent>;
  const { providers, router } = mockProviders();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [WorkerSelectionComponent],
      providers,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSelectionComponent);
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

  it('should match snapshot if a slot has been selected', () => {
    const basketService = TestBed.inject(BasketService);
    basketService.selectSlot({ id: 1 } as any);
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });
});
