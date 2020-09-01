import { ElementRef, Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'error-alert',
  templateUrl:"./errorAlert.component.html"
})
export class ErrorAlertComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input('form-group') formModel: FormGroup;
  //@Input('auth') Url: string;
  constructor(el: ElementRef) {
  }
}
