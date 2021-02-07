import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouteConfigLoadStart, RouterEvent, RouteConfigLoadEnd } from '@angular/router';
import { LocalizationService } from '../../../shared/localization';
//import { LocalizationService } from '../../shared/Localization';

@Component({
  selector: 'app-guest-panel',
  templateUrl: './guest-panel.component.html',
  styleUrls: ['./guest-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuestPanelComponent implements OnInit {

  public isShowingRouteLoadIndicator: boolean;
  get isLoading() {
    return this.isShowingRouteLoadIndicator /*|| !this.localeService.localeIsReady*/;
  }
  constructor(
    private router: Router,
    private localeService: LocalizationService
  ) {
    this.configRouter();
  }
  changeCulture() {
    if (this.localeService.getLocale() === "fa-IR")
      this.localeService.setLocale("en-US");
    else
      this.localeService.setLocale("fa-IR");
  }
  menus = [];
  configRouter() {
    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;

    // The Router emits special events for "loadChildren" configuration loading. We
    // just need to listen for the Start and End events in order to determine if we
    // have any pending configuration requests.
    this.router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {

          asyncLoadCount++;

        } else if (event instanceof RouteConfigLoadEnd) {

          asyncLoadCount--;

        }
        // If there is at least one pending asynchronous config load request,
        // then let's show the loading indicator.
        // --
        // CAUTION: I'm using CSS to include a small delay such that this loading
        // indicator won't be seen by people with sufficiently fast connections.
        this.isShowingRouteLoadIndicator = !!asyncLoadCount;

      }
    );
  }
  ngOnInit(): void {
    document.body.setAttribute("layout", "guest");
    this.menus = [
      {
        'url': '/',
        'title': 'Dashboard',
        'icon': 'fa-tachometer-alt',
        'hasChild': false,
        'selected': true
      },
      {
        'url': '',
        'title': 'ContentManagement',
        'hasChild': true,
        'icon': 'fa-edit',
        'subMenus': [
          {
            'url': 'Books',
            'title': 'Books',
            'hasChild': false
          }],
      }
    ];
  }

}
