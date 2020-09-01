import { Directive, ElementRef, Input, Host, Optional, SkipSelf } from '@angular/core';
import { FormGroupDirective, FormGroup, AbstractControl } from '@angular/forms';

@Directive({
  selector: 'label[for]',
})
export class RequiredDirective {
  @Input('for') controlName: string;
  private fg: FormGroupDirective;
  constructor(private el: ElementRef, @Optional() @Host() @SkipSelf() parent: FormGroupDirective) {
    this.fg = parent;
  }
  ngOnInit() {
    console.log(this.fg);
    if (!this.fg)
      return;
    const control = this.fg.control.controls[this.controlName];
    if (!control || !control.validator)
      return;
    const validator = control.validator({} as AbstractControl);
    const isRequired = validator && validator.required;
    this.el.nativeElement.classList.add("is-required");
  }
}
