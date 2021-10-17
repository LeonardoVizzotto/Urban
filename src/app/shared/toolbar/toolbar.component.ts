import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ROUTES } from 'src/app/routes.constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolBarComponent {
  slots = ROUTES.SLOTS;
  basket = ROUTES.BASKET;
  public user$ = this.authService.currentUser$;
  constructor(private authService: AuthenticationService) {}
}
