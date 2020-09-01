import { Component, Injectable, forwardRef, Input } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'jalali-moment';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

@Component({
  selector: 'datepicker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.scss'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input("placeholder") placeHolder: string;
  constructor(private calendar: NgbCalendar) {
  }
  onChange: any = () => {
  }
  onTouch: any = () => { }
  val: string;

  dateTypingHandler($event) {
    const value = $event.target.value;
    this.onChange(this.jalaliStringToIso(value));
  }
  dateSelectHandler(event: NgbDateStruct) {
    if (!event) {
      this.onChange(null);
      return;
    }
    this.onChange(this.jalaliModelToIso(event));
  }
  writeValue(value: any) {
    if (!value) {
      this.val = "";
      return;
    }
    this.val = this.isoToJalaliString(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
  isoToJalaliString(value: string): string {
    moment.locale('fa', { useGregorianParser: true });
    const momentDate = moment(value);
    if (!momentDate.isValid)
      return "";
    return momentDate.format('jYYYY/jMM/jDD');
  }
  jalaliModelToIso(value: NgbDateStruct): string {
    const dateString = `${value.year}/${value.month}/${value.day}`;
    return this.jalaliStringToIso(dateString);
  }
  jalaliStringToIso(value: string): string {
    const m = moment(value, 'jYYYY/jMM/jDD');
    if (!m.isValid)
      return null;
    return m.toISOString();
  }
}
