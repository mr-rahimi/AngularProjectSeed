export class CaptchaApiResponse {
  constructor(
    public dntCaptchaImgUrl: string = "",
    public dntCaptchaId: string = "",
    public dntCaptchaTextValue: string = "",
    public dntCaptchaTokenValue: string = ""
  ) { }
}
