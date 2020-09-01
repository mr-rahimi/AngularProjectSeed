import { Component, forwardRef, TemplateRef, ViewContainerRef, OnInit, Input, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'jalali-moment';
import { JalaliDateMask } from '../text-mask/date-mask';

@Component({
  selector: 'date-mask',
  template: '<input type="text" [class]="class" [textMask]="mask" [value]="val" (change)="changeHandler($event)" />',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  mask = JalaliDateMask;
  ngOnInit(): void {

  }
  @HostBinding('class') classList = 'fixed-class';
  @Input() class: string;

  constructor() { }

  onChange: any = () => {
  }
  onTouch: any = () => { }
  val = ""

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val
      //this.onChange(val)
      //this.onTouch(val)
    }
  }
  changeHandler(event) {
    const m = moment(event.target.value, 'jYYYY/jMM/jDD');
    const iso = m.toISOString();
    //console.log('jh', iso);
    this.onChange(iso);
  }
  writeValue(value: any) {
    if (value) {
      moment.locale('fa', { useGregorianParser: true });
      //console.log('date', value);
      var s = moment(value).format('jYYYY/jMM/jDD');
      this.value = s
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

}
