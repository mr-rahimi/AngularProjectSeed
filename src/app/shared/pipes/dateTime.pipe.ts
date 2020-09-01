import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'jalali-moment';

export function formatDateTime(date) {
  moment.locale('fa', { useGregorianParser: true });
  const datetime = moment(date);
  if (!datetime.isValid())
    return "-";
  return datetime.format('jYYYY/jMM/jDD HH:mm:ss');
}

export function formatDate(date) {
  moment.locale('fa', { useGregorianParser: true });
  const datetime = moment(date);
  if (!datetime.isValid())
    return "-";
  return datetime.format('jYYYY/jMM/jDD');
}
export function formatTime(date) {
  moment.locale('fa', { useGregorianParser: true });
  const datetime = moment(date);
  if (!datetime.isValid())
    return "-";
  return datetime.format('HH:mm');
}

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
  transform(date) {
    return formatDateTime(date);
  }
}
@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  transform(date) {
    return formatDate(date);
  }
}
@Pipe({
  name: 'timeFormatter'
})
export class TimeFormatterPipe implements PipeTransform {
  transform(date) {
    return formatTime(date);
  }
}
