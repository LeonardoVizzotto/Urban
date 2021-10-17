import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private loadingMap: Map<string, number> = new Map<string, number>();
  public isLoading$ = this.loadingSub.asObservable();
  constructor() {}

  setLoading(count: number, url: string): void {
    this.loadingMap.set(url, (this.loadingMap.get(url) || 0) + count);
    if (count > 0) {
      this.loadingSub.next(true);
    } else if (this.loadingMap.get(url) === 0) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
