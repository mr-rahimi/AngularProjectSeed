import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-designer-panel',
  templateUrl: './designer-panel.component.html',
  styleUrls: ['./designer-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerPanelComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    
  }
  public title: string;
  ngOnInit(): void {
    this.route.data.subscribe(x => {
      console.log();
      this.title = x["title"];
    })
    document.body.setAttribute("layout", "designer-panel");
    const container = document.getElementsByClassName('template_container');
    const sideMenu = document.getElementById('sideMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');


    hamburgerBtn.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
      container[0].classList.toggle('open');
    });
  }
 
}
