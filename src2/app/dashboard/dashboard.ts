import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, RouterOutlet, RouterModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class DashboardComponent {
    isCollapsed = false;

    navItems = [
        { label: 'Dashboard', icon: '🏠', route: '/dashboard', active: true },
        { label: 'Industry Internship', icon: '💼', route: '/dashboard/internships', active: false },
        { label: 'Financial Aid', icon: '💰', route: '/dashboard/financial-aid', active: false }
    ];

    constructor(public router: Router) { }

    navigateTo(route: string) {
        console.log('Navigating to:', route);
        this.router.navigate([route]).then(success => {
            console.log('Navigation success:', success);
        }).catch(err => {
            console.error('Navigation error:', err);
        });

        // Mobile close
        if (window.innerWidth < 768) {
            this.isCollapsed = true;
        }
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }
}
