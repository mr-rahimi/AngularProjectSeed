import { Directive, ElementRef, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { PermissionService } from './permission.service';

@Directive({
    selector: '[permission]',
})
export class AuthDirective {
  
  @Input() set permission(val: string) {
    let isAccessible = true;
    if (!val) {
      this.view.createEmbeddedView(this.template);
      return;
    }
    const permissions: string[] = val.split(',');
    if (!permissions.some(x => this.permissionService.hasAccess(x)))
      isAccessible = false;
    if (isAccessible)
      this.view.createEmbeddedView(this.template);
    else
      this.view.clear();
  }
  constructor(
    private el: ElementRef,
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private permissionService: PermissionService
  ) {

  }
}
