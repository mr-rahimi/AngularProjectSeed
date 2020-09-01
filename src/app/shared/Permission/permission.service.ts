import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionStore } from './permissionStore';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  public static permission_store_key = "permissions";
  private static permissionCheckers: ((permission: string) => boolean)[]=[];
  private static roleCheckers: ((permission: string, roles: string[]) => boolean)[]=[];
  private static permissionStore: PermissionStore;
  private static roles: string[];

  LoadPermissions(roles: string[]): void {
    PermissionService.roles = roles;
    PermissionService.permissionStore.LoadPermission(roles).subscribe(
      
      x => {
        localStorage.setItem(PermissionService.permission_store_key, JSON.stringify(x));
      }
    );
  }
  setPermissionStore(permissionStore: PermissionStore): void {
    PermissionService.permissionStore = permissionStore
  }

  addRoleChecker(checker: (permission: string, roles: string[]) => boolean): void {
    PermissionService.roleCheckers.push(checker);
  }
  addPermissionChecker(checker: (permission: string) => boolean): void {
    PermissionService.permissionCheckers.push(checker);
  }

  hasAccess(permission: string): boolean {
    const roleaccessibility = PermissionService.roleCheckers.some(x => x(permission, PermissionService.roles));
    if (roleaccessibility)
      return true;
    const permisionaccessibility = PermissionService.permissionCheckers.some(x => x(permission));
    if (permisionaccessibility)
      return true;
    return false;
  }
}
