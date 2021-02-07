import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LocalizationService } from '../../../shared/localization';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPanelComponent implements OnInit {
  public isShowingRouteLoadIndicator: boolean;
  get isLoading() {
    return this.isShowingRouteLoadIndicator /*|| !this.localeService.localeIsReady*/;
  }
  constructor(
    private router: Router,
    private localeService: LocalizationService
  ) {
  }

  ngOnInit(): void {
    document.body.setAttribute("layout", "account");
  }
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
}
