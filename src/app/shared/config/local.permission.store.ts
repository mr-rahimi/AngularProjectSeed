import { PermissionStore } from '../Permission';
import { Observable, of } from 'rxjs';
import { PermissionMapping } from './permission.mapping';

//this is an implementation of PermissionStore
//it get current user roles
//and looking in permission mapping and find the permissions of these roles
export class LocalPermissionStore implements PermissionStore {
  LoadPermission(roles: string[]): Observable<string[]> {
    const perm: string[] = [];
    for (const key in PermissionMapping) {
      if (PermissionMapping[key].some(x => roles.some(y => x.toUpperCase() === y.toUpperCase()))) {
        perm.push(key);
      }
    }
    return of(perm);
  }
}
