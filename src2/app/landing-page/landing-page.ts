import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private router = inject(Router);

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
