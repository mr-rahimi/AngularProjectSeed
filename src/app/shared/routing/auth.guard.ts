import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PermissionService } from '../Permission';
import { isNumber } from 'util';
import { SecurityHelper } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private service: SecurityHelper) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // const permission = next.data['permission'] as string[];
    // if (!permission || !permission.length)
    //   return false;
    // //return to login if token is expired
    // if (this.service.isTokenExpired()) {
    //   this.router.navigate(['/account/login']);
    //   return false;
    // }
    // //return to login if don't have enough permission
    // const hasPermission = permission.some(x => this.permissionService.hasAccess(x));
    // if (!hasPermission) {
    //   this.router.navigate(['/account/login']);
    //   return false;
    // }
    return true;
  }
}
