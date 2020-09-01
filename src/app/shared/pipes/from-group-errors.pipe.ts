import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Pipe({
  name: 'transformErrors',
  pure: false
})
export class FormGroupErrorsPipe implements PipeTransform {
  transform(value: FormGroup, key?: string): BusinessError[] {

    return this.getErrors(value, key);
  }
  getErrors(value: FormGroup, controlName?: string): BusinessError[] {
    if (controlName)
      return this.getControlErrors(value, controlName);
    else
      return this.getFormErrors(value);
  }
  getFormErrors(value: FormGroup): BusinessError[] {

    const x: BusinessError[] = [];
    if (value.status !== "INVALID")
      return [];
    //console.log(value.errors);
    for (const key in value.errors) {
      const message = value.errors[key].message ?? key;
      const params = value.errors[key].parameters ?? null;
      x.push({ subject: "", message: message, params: params });
    }
    return x;
  }
  getControlErrors(value: FormGroup, controlName: string): BusinessError[] {
    const x: BusinessError[] = [];
    if (!value.get(controlName))
      return [];
    if (!value.get(controlName).hasError)
      return [];
    if (!value.get(controlName).touched)
      return [];
    const errors = value.get(controlName).errors;
    for (const key in errors) {
      const message = errors[key].message ?? key;
      const params = errors[key].params ?? errors[key];
      x.push({ subject: controlName, message: message, params: params });
    }
    return x;
  }
}

class BusinessError {
  subject: string;
  message: string;
  params?: Object;
}
