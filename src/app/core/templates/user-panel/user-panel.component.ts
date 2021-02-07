import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import $ from 'jquery';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { SecurityHelper } from '../../shared/helpers';
import { LocalizationService } from '../../../shared/localization';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {

  constructor(
    private router: Router,
    public securityHelper: SecurityHelper,
    private localeService: LocalizationService
  ) {
  }

  public isShowingRouteLoadIndicator: boolean;
  get isLoading() {
    return this.isShowingRouteLoadIndicator || !this.localeService.localeIsReady;
  }
  menus = [];
  logout(): void {
    this.securityHelper.removeAccessToken();
    this.router.navigate(['account', 'login']);
  }
  ngOnInit(): void {
    $('[data-toggle="offcanvas"]').on('click', function () {
      $('.offcanvas-collapse').toggleClass('open')
    });
    document.body.setAttribute("layout", "user");
    this.menus = [
      {
        'url': '/',
        'title': 'Dashboard',
        'icon': 'fa-tachometer-alt',
        'hasChild': false,
        //'icon': 'tachometer-alt',
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
    this.configRouter();
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
