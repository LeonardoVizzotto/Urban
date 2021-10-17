import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ROUTES } from './routes.constants';

const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    component: LoginComponent,
  },
  {
    path: ROUTES.SLOTS,
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: ROUTES.BASKET,
    loadChildren: () =>
      import('./basket/basket.module').then((m) => m.BasketModule),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: ROUTES.SLOTS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
