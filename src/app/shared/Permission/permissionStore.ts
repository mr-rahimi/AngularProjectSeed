import { Observable } from "rxjs";

export interface PermissionStore {
  LoadPermission(roles: string[]): Observable<string[]>
}
