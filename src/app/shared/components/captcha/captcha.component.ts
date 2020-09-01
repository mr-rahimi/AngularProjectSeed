
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";

import { CaptchaApiResponse } from "./captcha-api-response";
import { CaptchaLanguage } from "./captcha-language";
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: "captcha-input",
  templateUrl: "./captcha.component.html",
  styleUrls: ["./captcha.component.css"],
})
export class CaptchaComponent implements OnInit {
  apiResponse = new CaptchaApiResponse();
  hiddenInputName = "DNTCaptchaText";
  hiddenTokenName = "DNTCaptchaToken";
  inputName = "DNTCaptchaInputText";

  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();

  @Input() token: string;
  @Output() tokenChange = new EventEmitter<string>();

  @Input() inputText: string;
  @Output() inputTextChange = new EventEmitter<string>();

  @Input() placeholder: string;
  @Input() apiUrl: string;
  @Input() backColor: string;
  @Input() fontName: string;
  @Input() fontSize: number;
  @Input() foreColor: string;
  @Input() language: CaptchaLanguage;
  @Input() max: number;
  @Input() min: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.doRefresh();
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error("getCaptchaInfo error: ", error);
    return Observable.throw(error.statusText);
  }

  getCaptchaInfo(): Observable<CaptchaApiResponse> {
    return this.http
      .get<CaptchaApiResponse>(`${this.apiUrl}`, {
        withCredentials: true /* For CORS */,
      })
      .pipe(
        map((response) => response || {} as CaptchaApiResponse),
        catchError(this.handleError));
  }

  doRefresh() {
    this.inputText = "";
    this.getCaptchaInfo().subscribe((data) => {
      this.apiResponse = data;
      this.text = data.dntCaptchaTextValue;
      this.onTextChange();
      this.token = data.dntCaptchaTokenValue;
      this.onTokenChange();
    });
  }

  onTextChange() {
    this.textChange.emit(this.text);
  }

  onTokenChange() {
    this.tokenChange.emit(this.token);
  }

  onInputTextChange() {
    this.inputTextChange.emit(this.inputText);
  }
}
