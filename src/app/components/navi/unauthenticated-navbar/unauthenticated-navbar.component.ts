import { Router } from '@angular/router';
import { AdvertSearchFilter } from './../../../models/advertSearchFilter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthenticated-navbar',
  templateUrl: './unauthenticated-navbar.component.html',
  styleUrls: ['./unauthenticated-navbar.component.css'],
})
export class UnauthenticatedNavbarComponent implements OnInit {
  filter: AdvertSearchFilter = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  createFilter() {
    if (this.filter.term != undefined || this.filter.term != null) {
      this.router.navigate(['search/', JSON.stringify(this.filter)]);
    }
  }
}
