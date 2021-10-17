import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/routes.constants';
import { BasketService } from 'src/app/services/basket/basket.service';
import { Slot } from 'src/app/services/slots/model';
import { Worker } from 'src/app/services/workers/model';
import { WorkersService } from 'src/app/services/workers/workers.service';

@Component({
  selector: 'app-worker-selection',
  templateUrl: './worker-selection.component.html',
  styleUrls: ['./worker-selection.component.scss'],
})
export class WorkerSelectionComponent implements OnInit {
  public slot?: Slot;
  public availableWorkers$: Observable<Worker[]>;
  constructor(
    private basketService: BasketService,
    private workersService: WorkersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slot = this.basketService.selectedSlot;
    if (!this.slot) {
      this.router.navigate([ROUTES.SLOTS]);
      return;
    }

    this.availableWorkers$ = this.workersService.getAvailableWorkersDataBySlot(
      this.slot!.id
    );
  }

  public selectWorker(worker: Worker) {
    this.basketService.selectWorker(worker);
    this.router.navigate([ROUTES.CHECKOUT]);
  }
}
