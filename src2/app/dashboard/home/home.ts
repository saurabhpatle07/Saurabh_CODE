import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private router = inject(Router);

  navigateToCourseJourney() {
    // Navigate relative to current route
    this.router.navigate(['dashboard', 'course-journey']);
  }

  navigateToInternships() {
    console.log('Home: Navigating to Internships');
    this.router.navigate(['dashboard', 'internships']);
  }

  navigateToFinancialAid() {
    console.log('Home: Navigating to Financial Aid');
    this.router.navigate(['dashboard', 'financial-aid']);
  }

  navigateToCourseMaterial() {
    console.log('Home: Navigating to Course Material');
    this.router.navigate(['dashboard', 'course-material']);
  }

  navigateToFocusAreas() {
    console.log('Home: Navigating to Focus Areas');
    this.router.navigate(['dashboard', 'focus-areas']);
  }

  navigateToMentorChat() {
    console.log('Home: Navigating to Mentor Chat');
    this.router.navigate(['dashboard', 'mentor-chat']);
  }
}
