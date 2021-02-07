import { Component } from '@angular/core';
import { AppInitService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private appInitService: AppInitService
  ) {
    appInitService.initLocale();
  }
}
