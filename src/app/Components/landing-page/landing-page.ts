import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningPathService } from '../../learning-path.service';
import { AudioModal } from '../audio-modal/audio-modal';
import { RoadmapComponent } from '../roadmap/roadmap';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AudioModal, RoadmapComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  topic: string = '';
  response: any = null;
  loading: boolean = false;
  error: string = '';

  // Controls visibility of the voice modal
  showMascot: boolean = false;
  conversationEnded: boolean = false;
  showRoadmap: boolean = false;

  constructor(private learningPathService: LearningPathService) { }

  // --- Main Logic (Text Generation) ---
  onSubmit() {
    if (!this.topic) return;
    this.loading = true;
    this.error = '';
    this.response = null;

    this.learningPathService.generatePath(this.topic).subscribe({
      next: (data) => {
        this.response = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Backend error. Ensure FastAPI is running on port 8000.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // --- Modal Controls ---
  openMascot() {
    this.showMascot = true;
    this.conversationEnded = false;
  }

  closeMascot() {
    this.showMascot = false;
    // Don't set conversationEnded here - only set it when conversation actually completes
  }

  // Call this when conversation actually ends (not just closes)
  endConversation() {
    this.showMascot = false;
    this.conversationEnded = true;
  }

  startJourney() {
    console.log('Starting your learning journey!');
    this.conversationEnded = false;
    this.showRoadmap = true;
  }
}