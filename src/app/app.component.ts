import { Component, Directive } from '@angular/core';
import { LocalizationService } from './shared/Localization/localization.service';
import { PermissionService } from './shared/Permission';
import { of } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { PermissionMapping } from './shared/config'
import { LocalPermissionStore } from './shared/config';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SecurityHelper } from './shared/helpers';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    localization: LocalizationService,
    private permissionService: PermissionService,
    private userService: SecurityHelper,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private modalService: NgbModal
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('Direction').subscribe((res: string) => {
      });
      localStorage.setItem("culture", event.lang);
    });
    translate.setDefaultLang('fa-IR');
    translate.addLangs(['fa-IR']);
    var savedCulture = localStorage.getItem('culture');
    if (savedCulture)
      translate.use(savedCulture);
    else
      translate.use(translate.defaultLang);

    permissionService.setPermissionStore(new LocalPermissionStore());
    if (userService.isAuthenticated)
      permissionService.LoadPermissions(userService.getUserRoles());
    permissionService.addPermissionChecker(x => {
      return true;
    });
    permissionService.addPermissionChecker(x => {
      const str = localStorage.getItem(PermissionService.permission_store_key);
      const obj = JSON.parse(str) as string[];
      return obj.some(perm => perm === x);
    });
    permissionService.addPermissionChecker(x => {
      return (x.toUpperCase() === "authenticated".toUpperCase() && userService.isAuthenticated());
    });

    this.configRouteTitle();
    this.closeModalsOnRouteChange();
  }
  configRouteTitle(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => {
        const title = event['breadcrumb'];
        if (!title)
          return;
        const titleTranslated = this.translate.instant(`BreadCrumbsTitle.${title}`) ?? title;
        this.titleService.setTitle(titleTranslated)
      });
  }
  closeModalsOnRouteChange(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.modalService.dismissAll();
      }
    });
  }
}
