import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-internships',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './internships.html',
    styleUrl: './internships.css'
})
export class InternshipsComponent {

    // Mock User Eligibility (could come from a service)
    userGPA = 8.5;
    userSkills = ['Angular', 'TypeScript', 'HTML/CSS'];

    internships = [
        {
            id: 1,
            company: 'Google',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', // Placeholder
            role: 'Frontend Engineering Intern',
            location: 'Bangalore, India (Hybrid)',
            duration: '6 Months',
            stipend: '₹80,000 / month',
            deadline: 'Apply by 20th Dec',
            minGPA: 8.0,
            requiredSkills: ['Angular', 'Data Structures', 'JavaScript'],
            description: 'Join the Google Cloud team to build next-gen interfaces. Work with Angular and Material Design.',
            color: '#4285F4'
        },
        {
            id: 2,
            company: 'Microsoft',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
            role: 'Software Developer Intern',
            location: 'Hyderabad, India',
            duration: '3 Months',
            stipend: '₹75,000 / month',
            deadline: 'Apply by 15th Jan',
            minGPA: 7.5,
            requiredSkills: ['React', 'C#', 'Azure'],
            description: 'Work on Azure portal experiences. Great opportunity to learn cloud computing at scale.',
            color: '#F25022'
        },
        {
            id: 3,
            company: 'Swiggy',
            logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
            role: 'UI/UX Developer Intern',
            location: 'Remote',
            duration: '6 Months',
            stipend: '₹40,000 / month',
            deadline: 'Rolling Basis',
            minGPA: 7.0,
            requiredSkills: ['HTML/CSS', 'Figma', 'JavaScript'],
            description: 'Help us redefine food delivery apps. Focus on animation and micro-interactions.',
            color: '#FC8019'
        }
    ];

    isEligible(internship: any): boolean {
        // strict check: user GPA >= minGPA
        // loose check: user has at least one matching skill (for demo purposes)
        const gpaCheck = this.userGPA >= internship.minGPA;
        const skillCheck = internship.requiredSkills.some((skill: string) => this.userSkills.includes(skill));

        // For Microsoft, let's pretend user isn't eligible due to missing React skill if we strictly checked all, 
        // but for this MVP let's just use GPA as primary blocker or helper.
        return gpaCheck;
    }

    appliedIds = new Set<number>();

    apply(internship: any) {
        if (!this.isEligible(internship)) {
            alert(`You need a GPA of ${internship.minGPA} to apply for this role.`);
            return;
        }

        this.appliedIds.add(internship.id);
        alert(`Successfully applied to ${internship.company}! Good luck! 🚀`);
    }
}
