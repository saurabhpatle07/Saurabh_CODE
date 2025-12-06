import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AudioModal } from '../audio-modal/audio-modal';

interface Resource {
    name: string;
    url: string;
}

interface LearningStep {
    id: number;
    title: string;
    description: string;
    subtopics: string[];
    duration: string;
    resources: Resource[];
    videoUrl?: string;
}

@Component({
    selector: 'app-roadmap',
    standalone: true,
    imports: [CommonModule, AudioModal],
    templateUrl: './roadmap.html',
    styleUrl: './roadmap.css'
})
export class RoadmapComponent {
    selectedStep: LearningStep | null = null;
    showVideoPlayer: boolean = false;
    currentVideoUrl: SafeResourceUrl | null = null;
    completedSteps: Set<number> = new Set();
    credits: number = 0;
    showMascot: boolean = false;

    constructor(private sanitizer: DomSanitizer) { }

    learningPath: LearningStep[] = [
        {
            id: 1,
            title: 'HTML Basics',
            description: 'Learn the fundamentals of HTML structure and elements',
            subtopics: [
                'HTML Document Structure',
                'Semantic HTML',
                'Forms and Inputs',
                'Tables and Lists',
                'Multimedia Elements'
            ],
            duration: '2 weeks',
            resources: [
                { name: 'MDN HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
                { name: 'W3Schools HTML Tutorial', url: 'https://www.w3schools.com/html/' },
                { name: 'FreeCodeCamp HTML Course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' }
            ],
            videoUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU'
        },
        {
            id: 2,
            title: 'CSS Fundamentals',
            description: 'Master styling and layout with CSS',
            subtopics: [
                'Selectors and Specificity',
                'Box Model',
                'Flexbox',
                'Grid Layout',
                'Responsive Design',
                'Animations and Transitions'
            ],
            duration: '3 weeks',
            resources: [
                { name: 'CSS Tricks - A Complete Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
                { name: 'Flexbox Froggy Game', url: 'https://flexboxfroggy.com/' },
                { name: 'Grid Garden Game', url: 'https://cssgridgarden.com/' },
                { name: 'MDN CSS Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }
            ],
            videoUrl: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc'
        },
        {
            id: 3,
            title: 'JavaScript Core',
            description: 'Build interactive web applications with JavaScript',
            subtopics: [
                'Variables and Data Types',
                'Functions and Scope',
                'DOM Manipulation',
                'Events and Event Handling',
                'Async JavaScript (Promises, Async/Await)',
                'ES6+ Features'
            ],
            duration: '4 weeks',
            resources: [
                { name: 'JavaScript.info Tutorial', url: 'https://javascript.info/' },
                { name: 'Eloquent JavaScript Book', url: 'https://eloquentjavascript.net/' },
                { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
                { name: 'FreeCodeCamp JavaScript', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' }
            ],
            videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c'
        },
        {
            id: 4,
            title: 'Frontend Framework',
            description: 'Learn modern frontend development with Angular/React/Vue',
            subtopics: [
                'Component Architecture',
                'State Management',
                'Routing',
                'HTTP Requests',
                'Form Handling',
                'Testing'
            ],
            duration: '6 weeks',
            resources: [
                { name: 'Official Angular Docs', url: 'https://angular.io/docs' },
                { name: 'React Official Tutorial', url: 'https://react.dev/learn' },
                { name: 'Vue.js Guide', url: 'https://vuejs.org/guide/introduction.html' },
                { name: 'Frontend Masters', url: 'https://frontendmasters.com/' }
            ],
            videoUrl: 'https://www.youtube.com/watch?v=3dHNOWTI7H8'
        },
        {
            id: 5,
            title: 'Build Tools & Git',
            description: 'Master development workflow and version control',
            subtopics: [
                'Git Basics and Workflows',
                'Package Managers (npm/yarn)',
                'Webpack/Vite',
                'Build Optimization',
                'CI/CD Basics'
            ],
            duration: '2 weeks',
            resources: [
                { name: 'Git Documentation', url: 'https://git-scm.com/doc' },
                { name: 'Pro Git Book (Free)', url: 'https://git-scm.com/book/en/v2' },
                { name: 'Webpack Guides', url: 'https://webpack.js.org/guides/' },
                { name: 'GitHub Learning Lab', url: 'https://skills.github.com/' }
            ],
            videoUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
        }
    ];

    selectStep(step: LearningStep): void {
        this.selectedStep = step;
    }

    closeDetails(): void {
        this.selectedStep = null;
    }

    playVideo(videoUrl: string): void {
        const videoId = this.extractYouTubeId(videoUrl);
        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
            this.showVideoPlayer = true;
        }
    }

    extractYouTubeId(url: string): string | null {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    closeVideoPlayer(): void {
        this.showVideoPlayer = false;
        this.currentVideoUrl = null;
    }

    openResource(url: string): void {
        window.open(url, '_blank');
    }

    isStepCompleted(stepId: number): boolean {
        return this.completedSteps.has(stepId);
    }

    markAsComplete(): void {
        if (this.selectedStep && !this.completedSteps.has(this.selectedStep.id)) {
            this.completedSteps.add(this.selectedStep.id);
            this.credits += 100;
        }
    }

    toggleCompletion(stepId: number): void {
        if (this.completedSteps.has(stepId)) {
            this.completedSteps.delete(stepId);
        } else {
            this.completedSteps.add(stepId);
        }
    }

    getProgressPercentage(): number {
        if (this.learningPath.length === 0) return 0;
        return (this.completedSteps.size / this.learningPath.length) * 100;
    }

    openMascot(): void {
        this.showMascot = true;
    }

    closeMascot(): void {
        this.showMascot = false;
    }

    onLearningPathGenerated(pathData: any): void {
        console.log('New learning path generated:', pathData);
        // TODO: Update or append learning path based on AI response
        this.closeMascot();
    }
}
