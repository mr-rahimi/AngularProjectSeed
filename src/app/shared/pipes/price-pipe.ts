import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationProvider } from '../config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
    private configurationProvider: ConfigurationProvider
  ) { }


  public transform(value: number): Observable<string> {
    //we can check the culture and convert price from base currency to culture currency by service call
    //now we just append toman to price
    const baseCurrencyName = this.configurationProvider.config.baseCurrency;

    return this.translateService.get(["Currencies", baseCurrencyName].join("."))
      .pipe(
        map(x => `${value} ${x}`)
      );
  }
}
