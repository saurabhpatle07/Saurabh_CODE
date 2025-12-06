import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-course-material',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './course-material.html',
    styleUrl: './course-material.css'
})
export class CourseMaterialComponent {

    // Mock: This would normally come from a service based on the user's active journey
    currentCourse = 'Angular Masterclass';

    // Adaptive Content Generation (Mock Logic)
    generatedContent = {
        studyStrategy: [
            {
                phase: 'Phase 1: Concepts',
                tip: 'Focus on understanding Dependency Injection and Components before jumping into coding.',
                action: 'Read "Architecture Overview" in docs.'
            },
            {
                phase: 'Phase 2: Practice',
                tip: 'Build small isolated components (e.g., a counter, a card) to build muscle memory.',
                action: 'Complete the "Tour of Heroes" tutorial.'
            },
            {
                phase: 'Phase 3: Integration',
                tip: 'Connect to real APIs. Handling AsyncPipe and Observables is key here.',
                action: 'Refactor standard subscribe() calls to use AsyncPipe.'
            }
        ],
        references: [
            {
                type: 'Documentation',
                title: 'Angular Official Docs',
                url: 'https://angular.dev',
                desc: 'The only source of truth. Refer to "Signals" section specifically.'
            },
            {
                type: 'Video',
                title: 'RxJS Visualized',
                url: 'https://www.youtube.com/watch?v=example',
                desc: 'Best for understanding marble diagrams and streams.'
            },
            {
                type: 'Article',
                title: 'Deep Dive into Standalone Components',
                url: 'https://blog.angular.io',
                desc: 'Crucial for Angular 15+ architecture.'
            }
        ],
        difficultyBlockers: [
            {
                topic: 'RxJS Streams',
                symptom: 'Confusion with switchMap vs mergeMap',
                solution: 'Use switchMap for search/cancellation, mergeMap for parallel saves. Think: "Switch" abandons old, "Merge" keeps all.'
            },
            {
                topic: 'Change Detection',
                symptom: 'ExpressionChangedAfterItHasBeenCheckedError',
                solution: 'Use signals or ensure you are not updating state inside the view generation phase. Move logic to ngOnInit.'
            },
            {
                topic: 'Routing',
                symptom: 'Lazy loading not working',
                solution: 'Ensure you are using loadComponent or loadChildren syntax correctly in app.routes.ts.'
            }
        ]
    };

}
