import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AppointmentItemComponent } from './appointment-item/appointment-item.component';

const routes: Routes = [
  {
    path: '',
    component: BasketComponent,
  },
];

@NgModule({
  declarations: [BasketComponent, AppointmentItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class BasketModule {}
