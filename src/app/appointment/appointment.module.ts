import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { SharedModule } from '../shared/shared.module';
import { WorkerSelectionComponent } from './worker-selection/worker-selection.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ROUTES } from '../routes.constants';

const routes: Routes = [
  {
    path: ROUTES.SLOTS,
    component: SlotSelectionComponent,
  },
  {
    path: ROUTES.WORKERS,
    component: WorkerSelectionComponent,
  },
  {
    path: ROUTES.CHECKOUT,
    component: CheckoutComponent,
  },
];

@NgModule({
  declarations: [
    SlotSelectionComponent,
    WorkerSelectionComponent,
    CheckoutComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AppointmentModule {}
