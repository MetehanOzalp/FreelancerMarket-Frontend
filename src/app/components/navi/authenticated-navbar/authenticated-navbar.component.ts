import { Router } from '@angular/router';
import { AdvertSearchFilter } from './../../../models/advertSearchFilter';
import { User } from './../../../models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-navbar',
  templateUrl: './authenticated-navbar.component.html',
  styleUrls: ['./authenticated-navbar.component.css'],
})
export class AuthenticatedNavbarComponent implements OnInit {
  @Input() user: User = {};
  @Input() isFreelancer: boolean = false;
  filter: AdvertSearchFilter = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  createFilter() {
    if (this.filter.term != undefined || this.filter.term != null) {
      this.router.navigate(['search/', JSON.stringify(this.filter)]);
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
