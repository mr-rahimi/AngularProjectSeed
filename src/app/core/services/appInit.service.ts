import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../shared/localization';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private localization: LocalizationService,
    private translate: TranslateService,

  ) { }
  initLocale() {
    this.localization.setLocale("fa-IR");
    this.localization.locale.subscribe(() => {
      this.translate.get("Direction").subscribe(x => {
        document.querySelector("html").setAttribute("dir", x);
      });
    });
  }
}
