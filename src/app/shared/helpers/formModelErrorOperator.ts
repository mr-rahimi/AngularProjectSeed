import { Observable, from, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { isArray } from 'util';
import { BusinessError } from '../models/common';
import { ToastService } from '../components/toast';

export const handleErrors = <T>(n: FormGroup) => (source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(x) {

        observer.next(x);
      },
      error(response) {
        if (response.error.constructor !== Array)
          observer.error(response);

        for (const key in response.error) {
          const errObj = response.error[key];
          console.log(errObj);
          const subject = errObj.subject;
          const message = errObj.message;
          const params = errObj ? errObj : true;
          if (subject === "") {
            n.setErrors({...n.errors, [message]: params });
          }
          else {
            const control = n.get(subject);

            if (control)
              control.setErrors({ [message]: params });
            else
              n.setErrors({ [message]: params });
          }
        }
        console.log(n);
        observer.error(response);
      },
      complete() {

        observer.complete();
      }
    });
  });
export const recordErrors = <T>(n: BusinessError[]) => (source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(x) {
        observer.next(x);
      },
      error(response) {
        if (!isArray(response.error)) {
          observer.error(response);
          return;
        }
        //clear previous errors
        n.splice(0, n.length);
        if (response.error) {
          for (const key in response.error) {
            const errObj = response.error[key];
            const subject = errObj.subject;
            const message = errObj.message;
            const params = errObj ? errObj : true;
            n.push({ subject: subject, message: message, params: params });
          }
        }
        observer.error(response);
      },
      complete() {
        observer.complete();
      }
    });
  });
export const streamErrors = <T>(n: Subject<BusinessError>) => (source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(x) {
        observer.next(x);
      },
      error(response) {
        if (!isArray(response.error)) {
          observer.error(response);
          return;
        }
        if (response.error) {
          for (const key in response.error) {
            const errObj = response.error[key];
            const subject = errObj.subject;
            const message = errObj.message;
            const params = errObj ? errObj : true;
            n.next({ subject: subject, message: message, params: params });
          }
        }
        observer.error(response);
      },
      complete() {
        observer.complete();
      }
    });
  });
