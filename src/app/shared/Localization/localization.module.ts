import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { IModuleTranslationOptions, ModuleTranslateLoader } from "@larscom/ngx-translate-module-loader";
import { LocalizationService } from "./localization.service";

export class LocalizationModuleConfig {
  moduleName: string;
}

function ParametricTranslateLoader(http: HttpClient, conf: LocalizationModuleConfig) {
  const module = conf.moduleName;
  const baseTranslateUrl = './assets/i18n';
  const options: IModuleTranslationOptions = {
    nameSpaceUppercase: false,
    enableNamespacing: false,
    deepMerge: true,
    modules: [
      // final url: ./assets/i18n/en.json
      { baseTranslateUrl },
      // final url: ./assets/i18n/feature1/en.json
      { moduleName: module, baseTranslateUrl },
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (ParametricTranslateLoader),
        deps: [HttpClient, LocalizationModuleConfig]
      },
      isolate: true
    }),
  ],
  exports: [
    TranslateModule
  ]
})
export class LocalizationModuleForChild {
  constructor(
    private translate: TranslateService,
    private localizationService: LocalizationService
  ) {
    localizationService.locale.subscribe(x => {
      localizationService.addloader();
      translate.use(x)
        .subscribe(
          () => localizationService.decreaseloader(),
          () => localizationService.decreaseloader()
        );
    });
  }
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (ParametricTranslateLoader),
        deps: [HttpClient, LocalizationModuleConfig]
      },
      useDefaultLang: true,
      isolate: false
    }),
  ],
  exports: [
    TranslateModule
  ]
})
export class LocalizationModuleForRoot {
  constructor(
    private translate: TranslateService,
    private localizationService: LocalizationService
  ) {
    localizationService.locale.subscribe(x => {
      localizationService.addloader();
      translate.use(x)
        .subscribe(
          () => localizationService.decreaseloader(),
          () => localizationService.decreaseloader()
        );
    });
  }
}

export class LocalizationModule {

  static forRoot(name: string): ModuleWithProviders<LocalizationModuleForRoot> {
    const conf = { moduleName: name } as LocalizationModuleConfig;
    return {
      ngModule: LocalizationModuleForRoot,
      providers: [{ provide: LocalizationModuleConfig, useValue: conf }]
    };
  }

  static forChild(name: string): ModuleWithProviders<LocalizationModuleForChild> {
    const conf = { moduleName: name } as LocalizationModuleConfig;
    return {
      ngModule: LocalizationModuleForChild,
      providers: [{ provide: LocalizationModuleConfig, useValue: conf }]
    };
  }
}


