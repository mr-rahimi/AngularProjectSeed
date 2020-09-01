import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../shared/services';

@Component({
  selector: 'app-profile',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private securityService: SecurityService
  ) { }
  html ="";
  ngOnInit() {
  
  }
}
