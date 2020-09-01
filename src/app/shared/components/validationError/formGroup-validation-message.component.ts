import { ElementRef, Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'formGroup-validation-message',
  templateUrl:"./formGroup-validation-message.component.html"
})
export class FormGroupValidationMessage implements OnInit {
  ngOnInit(): void {
  }
  @Input('form-group') formModel: FormGroup;
  @Input('key') key: string;
  constructor(el: ElementRef) {
  }
  getErrors(controlName: string): BusinessError[] {

    if (controlName)
      return this.getControlErrors(controlName);
    else
      return this.getFormErrors();
  }
  getFormErrors(): BusinessError[] {
    let x: BusinessError[] = [];
    if (!this.formModel.hasError)
      return [];
    if (!this.formModel.touched)
      return [];
    for (var key in this.formModel.errors) {
      x.push({ subject: key, message: this.formModel.errors[key] });
    }
    return x;
  }
  getControlErrors(controlName: string): BusinessError[] {
    let x: BusinessError[] = [];
    if (!this.formModel.get(controlName).hasError)
      return [];
    if (!this.formModel.get(controlName).touched)
      return [];
    for (var key in this.formModel.get(controlName).errors) {
      x.push({ subject: key, message: this.formModel.get(controlName).errors[key] });
    }
    return x;
  }
}
class BusinessError {
  subject: string;
  message: string;
}
