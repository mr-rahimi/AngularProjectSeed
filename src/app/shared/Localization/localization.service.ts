import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }
  loaderCount = 0;
  addloader() {
    ++this.loaderCount;
  }
  decreaseloader() {
    --this.loaderCount;
  }
  defaultLocale = "fa-IR";

  locale: BehaviorSubject<string> = new BehaviorSubject<string>(this.getLocale());

  setLocale(locale: string): void {
    localStorage.setItem("culture", locale);
    this.locale.next(locale);
  }
  getLocale(): string {
    const locale = localStorage.getItem('culture') || this.defaultLocale;
    return locale;
  }
  get localeIsReady() {
    return this.loaderCount === 0;
  }
}
