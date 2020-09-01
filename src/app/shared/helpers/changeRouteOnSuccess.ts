import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

export const changeRouteOnSuccess = (router: Router, route: ActivatedRoute, path: string) => (source:  Observable<any>) =>
  new Observable<any>(observer => {
    return source.subscribe({
      next(x) {
        const command = [path];
        const extras = { relativeTo: route };
        router.navigate(command, extras);

        observer.next(x);
      },
      error(err) {
        
        observer.error(err);
      },
      complete() {
        
        observer.complete();
      }
    });
  });
