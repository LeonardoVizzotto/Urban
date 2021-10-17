import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Toast } from './model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private id = 0;
  private notifier$: Subject<Toast> = new Subject<Toast>();
  private dismiss$: Subject<number> = new Subject<number>();

  constructor() {}

  error(message: string) {
    this.notifier$.next({ message, appearence: 'error' });
  }

  success(message: string) {
    this.notifier$.next({ message, appearence: 'success' });
  }

  dismiss(id: number) {
    this.dismiss$.next(id);
  }

  get notifier(): Observable<Toast> {
    return this.notifier$
      .asObservable()
      .pipe(tap((toast) => (toast.id = ++this.id)));
  }

  get dismisses(): Observable<number> {
    return this.dismiss$.asObservable();
  }
}
