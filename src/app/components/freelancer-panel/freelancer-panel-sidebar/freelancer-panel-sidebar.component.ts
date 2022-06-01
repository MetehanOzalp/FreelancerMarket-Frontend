import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelancer-panel-sidebar',
  templateUrl: './freelancer-panel-sidebar.component.html',
  styleUrls: ['./freelancer-panel-sidebar.component.css'],
})
export class FreelancerPanelSidebarComponent implements OnInit {
  url: string = '';

  constructor(private router: Router) {
    this.url = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {}

  isActiveMenu(url: string) {
    if (this.url.includes(url)) {
      return 'active-menu';
    } else {
      return null;
    }
  }
}
