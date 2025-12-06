import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-financial-aid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './financial-aid.html',
    styleUrl: './financial-aid.css'
})
export class FinancialAidComponent {

    // Mock User Profile
    userProfile = {
        name: 'John Doe',
        annualIncome: 450000, // ₹4.5 Lakh
        gpa: 8.5,
        category: 'General'
    };

    schemes = [
        {
            id: 1,
            title: 'National Merit Scholarship',
            provider: 'Govt. of India',
            amount: '₹50,000 / year',
            deadline: '31st Dec 2025',
            description: 'Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies.',
            eligibility: {
                minGPA: 8.0,
                maxIncome: 600000 // 6 Lakh
            },
            tags: ['Merit Based', 'Higher Ed'],
            color: '#198754' // Green
        },
        {
            id: 2,
            title: 'Picasso Digital Arts Grant',
            provider: 'Arts Council',
            amount: '₹1,00,000 (One-time)',
            deadline: '15th Jan 2026',
            description: 'Support for students pursuing careers in digital arts, UI/UX design, and animation. Requires a portfolio submission.',
            eligibility: {
                minGPA: 7.0,
                maxIncome: 1000000 // 10 Lakh
            },
            tags: ['Arts', 'Portfolio'],
            color: '#0d6efd' // Blue
        },
        {
            id: 3,
            title: 'EWS Education Loan Subsidy',
            provider: 'Ministry of Education',
            amount: 'Interest Subsidy (100%)',
            deadline: 'Rolling Basis',
            description: 'Full interest subsidy on education loans for students from Economically Weaker Sections (EWS) during the moratorium period.',
            eligibility: {
                minGPA: 6.0,
                maxIncome: 450000 // 4.5 Lakh
            },
            tags: ['Loan Support', 'EWS'],
            color: '#fd7e14' // Orange
        },
        {
            id: 4,
            title: 'Research Fellowship 2025',
            provider: 'Science Foundation',
            amount: '₹35,000 / month',
            deadline: '28th Feb 2026',
            description: 'Fellowship for students undertaking research projects in computer science and AI. Must publish at least one paper.',
            eligibility: {
                minGPA: 9.0,
                maxIncome: 99999999 // No income limit
            },
            tags: ['Research', 'AI'],
            color: '#6610f2' // Purple
        }
    ];

    appliedSchemes = new Set<number>();

    isEligible(scheme: any): boolean {
        const incomeCheck = this.userProfile.annualIncome <= scheme.eligibility.maxIncome;
        const gpaCheck = this.userProfile.gpa >= scheme.eligibility.minGPA;
        return incomeCheck && gpaCheck;
    }

    getEfficiencyMessage(scheme: any): string {
        if (!this.isEligible(scheme)) {
            if (this.userProfile.annualIncome > scheme.eligibility.maxIncome) return 'Income exceeds limit';
            if (this.userProfile.gpa < scheme.eligibility.minGPA) return 'GPA criteria not met';
        }
        return 'Eligible';
    }

    apply(scheme: any) {
        if (!this.isEligible(scheme)) return;

        // Simulate API call
        this.appliedSchemes.add(scheme.id);
        alert(`Application submitted for ${scheme.title}! Reference ID: ${Math.floor(Math.random() * 1000000)}`);
    }
}
