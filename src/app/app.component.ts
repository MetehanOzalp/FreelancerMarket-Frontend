import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  Router,
} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'freelancer-market-frontend';
  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      }
      if (
        event instanceof GuardsCheckEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }
}
