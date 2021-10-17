import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { Toast } from 'src/app/services/toast/model';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    const notifications$ = this.toastService.notifier
      .pipe(
        filter(
          (addedToast) =>
            !this.toasts.some((toast) => toast.message === addedToast.message)
        ),
        tap((toast) => {
          toast.show = false;
          this.toasts.push(toast);
        }),
        delay(25)
      )
      .subscribe((toast) => (toast.show = true));

    const dismisses$ = this.toastService.dismisses
      .pipe(delay(250))
      .subscribe(
        (id) => (this.toasts = this.toasts.filter((toast) => toast.id !== id))
      );

    this.subscriptions.add(notifications$);
    this.subscriptions.add(dismisses$);
  }

  close(toast: Toast): void {
    toast.show = false;
    this.toastService.dismiss(toast.id!);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
