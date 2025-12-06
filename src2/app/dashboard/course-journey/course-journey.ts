import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VoiceChatService } from '../../services/voice-chat.service';

@Component({
  selector: 'app-course-journey',
  imports: [CommonModule],
  templateUrl: './course-journey.html',
  styleUrl: './course-journey.css',
})
export class CourseJourneyComponent {
  private sanitizer = inject(DomSanitizer);
  private voiceChatService = inject(VoiceChatService);

  // ... existing properties ...

  playedVideos = new Set<string>();



  selectedCourse: any = null;
  isModalOpen = false;
  videoUrl: SafeResourceUrl | null = null;

  // Mock Data for Topics
  topics = [
    {
      title: 'Module 1: Getting Started',
      active: true,
      videoId: 'Ata9cSC2WpM', // Angular in 100 Seconds
      subtopics: [
        { title: 'Setting up Global Environment', videoId: '0eWrpsCLMJQ' }, // Angular 17 Crash Course
        { title: 'First Angular App', videoId: '3qBXWUpoPHo' }, // Full Course
        { title: 'Project Structure', videoId: 'lJ8MpU3F7f8' } // Project Structure
      ],
      quiz: {
        title: 'Module 1 Quiz',
        questions: [
          { text: 'Which command installs the Angular CLI?', options: ['npm install -g @angular/cli', 'ng new app', 'npm start'], correct: 0 },
          { text: 'What is the main building block of an Angular app?', options: ['Services', 'Components', 'Modules'], correct: 1 },
          { text: 'Which file contains the main application logic?', options: ['index.html', 'main.ts', 'styles.css'], correct: 1 },
          { text: 'How do you serve the application locally?', options: ['ng build', 'ng serve', 'ng test'], correct: 1 }
        ]
      }
    },
    {
      title: 'Module 2: Components & Templates',
      active: false,
      videoId: 'k5E2AVpwsko', // Components Intro
      subtopics: [
        { title: 'Component Lifecycle', videoId: '5wZ8a6b9Hws' }, // Lifecycle
        { title: 'Template Syntax', videoId: 'Fdf5aTYRW0E' }, // Syntax
        { title: 'Data Binding', videoId: 'jVfLivvi9h8' } // Binding
      ],
      quiz: {
        title: 'Module 2 Quiz',
        questions: [
          { text: 'Which decorator is used to define a component?', options: ['@Injectable', '@Component', '@Directive'], correct: 1 },
          { text: 'How do you bind a property in the template?', options: ['{property}', '[property]', '(property)'], correct: 1 },
          { text: 'Which lifecycle hook is called after initialization?', options: ['ngOnChanges', 'ngOnInit', 'ngOnDestroy'], correct: 1 },
          { text: 'How do you display text content in a template?', options: ['{{ text }}', '[text]', '*text'], correct: 0 }
        ]
      }
    },
    {
      title: 'Module 3: Directives & Pipes',
      active: false,
      videoId: 'b45xlQ77c2w', // Directives
      subtopics: [
        { title: 'Built-in Directives', videoId: 'SkyRo8g-01U' }, // Common Directives
        { title: 'Custom Directives', videoId: '4m45Tf7zWqM' }, // Custom Directives
        { title: 'Pipes Overview', videoId: '80jE-dF7_jU' } // Pipes
      ],
      quiz: {
        title: 'Module 3 Quiz',
        questions: [
          { text: 'Which directive loops over a list?', options: ['*ngIf', '*ngFor', '*ngSwitch'], correct: 1 },
          { text: 'Which character is used for pipes?', options: ['/', '|', ':'], correct: 1 },
          { text: 'What does *ngIf do?', options: ['Hides element', 'Removes element from DOM', 'Styles element'], correct: 1 },
          { text: 'Which pipe formats dates?', options: ['date', 'time', 'formatDate'], correct: 0 }
        ]
      }
    },
    {
      title: 'Module 4: Services & Dependency Injection',
      active: false,
      videoId: 'onh1e_Zf8n0', // Services
      subtopics: [
        { title: 'Creating Services', videoId: 'nL7b0-Fm7xo' }, // Creating
        { title: 'Injecting Services', videoId: 'N9yq3iYm8h8' }, // DI
        { title: 'Singleton Pattern', videoId: '0gBq9hC2h0w' } // Singleton
      ],
      quiz: {
        title: 'Module 4 Quiz',
        questions: [
          { text: 'What decorator marks a class as a service?', options: ['@Service', '@Injectable', '@Component'], correct: 1 },
          { text: 'Where are services typically provided?', options: ['In Components only', 'In root or modules', 'In methods'], correct: 1 },
          { text: 'What pattern does Angular DI use?', options: ['Singleton', 'Factory', 'Observer'], correct: 0 },
          { text: 'How do you inject a service into a component?', options: ['Constructor injection', 'Property assignments', 'Global import'], correct: 0 }
        ]
      }
    }
  ];

  /* Quiz Logic */
  isQuizModalOpen = false;
  activeQuiz: any = null;
  currentQuestionIndex = 0;
  selectedOption: number | null = null;
  quizScore = 0;
  showQuizResult = false;

  openQuiz(topic: any) {
    if (!topic.quiz) return;
    this.activeQuiz = topic.quiz;
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.selectedOption = null;
    this.showQuizResult = false;
    this.isQuizModalOpen = true;
  }

  selectOption(index: number) {
    this.selectedOption = index;
  }

  nextQuestion() {
    if (this.selectedOption === this.activeQuiz.questions[this.currentQuestionIndex].correct) {
      this.quizScore++;
    }

    if (this.currentQuestionIndex < this.activeQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
    } else {
      this.showQuizResult = true;
    }
  }

  closeQuiz() {
    this.isQuizModalOpen = false;
    this.activeQuiz = null;
  }


  courses = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the core concepts of Angular, including Components, Templates, and Data Binding.',
      status: 'Completed',
      completed: true,
      active: false,
      videoId: 'Ata9cSC2WpM' // Mock Video ID
    },
    {
      id: 2,
      title: 'Advanced Routing & Navigation',
      description: 'Master the Angular Router, child routes, guards, and lazy loading.',
      status: 'in Progress',
      completed: false,
      active: true,
      videoId: 'Ata9cSC2WpM'
    },
    {
      id: 3,
      title: 'State Management with Signals',
      description: 'Explore the new reactive primitive in Angular for managing application state.',
      status: 'Locked',
      completed: false,
      active: false,
      videoId: 'Ata9cSC2WpM'
    },
    {
      id: 4,
      title: 'Building for Production',
      description: 'Optimization techniques, AOT compilation, and deployment strategies.',
      status: 'Locked',
      completed: false,
      active: false,
      videoId: 'Ata9cSC2WpM'
    }
  ];

  openModal(course: any) {
    this.selectedCourse = course;
    // Default to the course intro video or first topic
    this.playVideo(course.videoId);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCourse = null;
    this.videoUrl = null;
  }

  toggleTopic(topic: any) {
    topic.active = !topic.active;
    if (topic.active) {
      this.playVideo(topic.videoId);
    }
  }

  selectedVideoId: string | null = null;

  // ...

  playVideo(videoId: string) {
    console.log('Playing video:', videoId);
    if (videoId) {
      this.selectedVideoId = videoId;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);

      // Track Progress for Mascot Trigger
      if (!this.playedVideos.has(videoId)) {
        this.playedVideos.add(videoId);
        this.playedVideos = new Set(this.playedVideos); // Force Change Detection
        console.log('Unique videos played:', this.playedVideos.size);

        if (this.playedVideos.size === 3) {
          // Legacy quiz trigger removed
          console.log('3 Videos Watched');
        }

        this.checkTopicCompletion(videoId);
      }
    }
  }

  // Practice Modal State
  isPracticeOpen = false;
  completedTopics = new Set<string>();

  checkTopicCompletion(videoId: string) {
    // Find the topic that contains this video
    const parentTopic = this.topics.find(t =>
      t.subtopics.some(s => s.videoId === videoId)
    );

    if (parentTopic && !this.completedTopics.has(parentTopic.title)) {
      // Check if ALL subtopics in this topic are played
      const allWatched = parentTopic.subtopics.every(sub =>
        this.playedVideos.has(sub.videoId)
      );

      if (allWatched) {
        this.completedTopics.add(parentTopic.title);
        console.log('Topic Completed:', parentTopic.title);
        this.openPracticeModal();
      }
    }
  }

  openPracticeModal() {
    this.isPracticeOpen = true;
  }

  closePracticeModal() {
    this.isPracticeOpen = false;
  }

  goToHackerRank() {
    window.open('https://www.hackerrank.com/domains/tutorials/30-days-of-code', '_blank');
    this.closePracticeModal();
  }

  // Feedback Logic
  feedbackRating: string | null = null;

  submitFeedback(rating: string) {
    this.feedbackRating = rating;
    console.log('Feedback submitted:', rating);
    // Here you would typically send this to a backend service

    if (rating === 'average' || rating === 'neutral') {
      console.log('Negative feedback - Triggering Mascot');
      setTimeout(() => {
        this.voiceChatService.triggerMascot('it seems you are unhappy may i know what is your problem ');
      }, 1000);
    }

    setTimeout(() => {
      // Auto-close or just show thanks
    }, 1000);
  }

}
