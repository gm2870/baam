import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  isMobile = signal<boolean>(false);
  isMobile$ = toObservable(this.isMobile);
  constructor(private responsive: BreakpointObserver) {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.isMobile.set(true);
      } else {
        this.isMobile.set(false);
      }
    });
  }
}
