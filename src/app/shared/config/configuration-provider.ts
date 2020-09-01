import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services';

export declare type AppConfig = { [key: string]: string };

@Injectable()
export class ConfigurationProvider {

  private _config: AppConfig;

  constructor(
    private ConfigurationService: ConfigurationService
  ) { }

  loadConfig() {
    const obs = this.ConfigurationService.getClientSettings();
    obs.subscribe(x => {
      this._config = { ...this._config, ...x };
    });
    return obs;
  }

  get config() {
    return this._config;
  }
}
