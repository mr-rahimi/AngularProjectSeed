import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import $ from 'jquery';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SecurityHelper } from '../../shared/helpers';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LocalizationService } from '../../shared/Localization';

@Component({
  selector: 'app-default-layout',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        visibility: 'visible',
        background: '#36474e'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.5,
        visibility: 'hidden'
      })),
      transition('open => closed', [
        animate('100ms')
      ]),
      transition('closed => open', [
        animate('100ms')
      ]),
    ]),
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      transition('rotated => default', animate('100ms linear')),
      transition('default => rotated', animate('100ms linear'))
    ])
  ],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnInit {

  public isShowingRouteLoadIndicator: boolean;
  get isLoading() {
    return this.isShowingRouteLoadIndicator || !this.localeService.localeIsReady;
  }
  constructor(
    private translate: TranslateService,
    public securityHelper: SecurityHelper,
    private router: Router,
    private localeService: LocalizationService
  ) {
  }
  logout(): void {
    this.securityHelper.removeAccessToken();
    this.router.navigate(['account','login']);
  }
  menus = [];
  setCulture(culture: string) {
    this.translate.use(culture);
  }

  menuItemClick(item): void {
    item.selected = !item.selected;
    for (let menu of this.menus) {
      if (menu != item)
        menu.selected = false;
    }
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
  subMenuItemClick(item): void {
    item.selected = !item.selected;
    for (let menu of this.menus) {
      if (menu.subMenus) {
        for (let subMenu of menu.subMenus) {
          if (subMenu != item) {
            subMenu.selected = false;
          }
        }
      }
    }
  }

  ngOnInit() {
    document.body.setAttribute("layout", "admin");
    this.menus = [
      {
        'url': 'dashboard',
        'title': 'Dashboard',
        'icon': 'fa-tachometer-alt',
        'permission': 'admin,contentManager',
        'hasChild': false,
        'selected': true
      },
      {
        'url': '',
        'title': 'forms',
        'permission': 'contentManager',
        'hasChild': true,
        'icon': 'fa-edit',
        'subMenus': [
          {
            'url': 'product',
            'title': 'Products',
            'hasChild': false
          }],
      }
    ];

    const treeviewMenu = $('.app-menu');
    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $('.app').toggleClass('sidenav-toggled');
    });

    $('[data-toggle="treeview."].is-expanded').parent().toggleClass('is-expanded');
    this.configRouter();

  }

}
