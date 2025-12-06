import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-focus-areas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './focus-areas.html',
    styleUrl: './focus-areas.css'
})
export class FocusAreasComponent {

    // Mock Performance Data
    performanceSummary = {
        overallScore: 72,
        quizzesTaken: 12,
        handsOnCompleted: 5
    };

    topicAnalysis = [
        { topic: 'Components & Templates', score: 90, status: 'Strength', color: 'success' },
        { topic: 'Dependency Injection', score: 85, status: 'Strength', color: 'success' },
        { topic: 'Routing & Navigation', score: 75, status: 'Neutral', color: 'warning' },
        { topic: 'RxJS & Observables', score: 45, status: 'Weakness', color: 'danger' },
        { topic: 'State Management (Signals)', score: 50, status: 'Weakness', color: 'danger' }
    ];

    recentChallenges = [
        {
            id: 1,
            type: 'Quiz',
            title: 'RxJS Operators Quiz',
            score: '4/10',
            issue: 'Struggled with mapping operators (switchMap vs mergeMap).'
        },
        {
            id: 2,
            type: 'Hands-on',
            title: 'Task Manager App',
            score: 'Pass (barely)',
            issue: 'Improper use of ngOnChanges leading to performance leaks.'
        }
    ];

    mitigationPlan = [
        {
            topic: 'RxJS & Observables',
            priority: 'High',
            actionItems: [
                'Watch "RxJS Visualized" video (Module 4).',
                'Complete "Operator Lab" mini-assignment.',
                'Refactor the "Search" component using debounceTime & switchMap.'
            ]
        },
        {
            topic: 'State Management',
            priority: 'Medium',
            actionItems: [
                'Read "Angular Signals" official documentation.',
                'Convert the "Counter" component from BehaviorSubject to Signals.'
            ]
        }
    ];

}
