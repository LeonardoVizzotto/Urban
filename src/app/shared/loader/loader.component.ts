import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading$ = this.loadingService.isLoading$.pipe(delay(1));
  constructor(private loadingService: LoadingService) {}
}
