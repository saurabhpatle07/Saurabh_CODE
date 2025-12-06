import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { VoiceChatService } from '../services/voice-chat.service';

@Component({
  selector: 'app-mascot',
  imports: [], // Standalone by default
  templateUrl: './mascot.html',
  styleUrl: './mascot.css',
})
export class Mascot implements OnDestroy {
  isModalOpen = false;
  greetingMessage = 'Hello How may i help you ?';

  // Voice Chat State
  private voiceService = inject(VoiceChatService);
  isRecording = false;
  isPlaying = false;

  // Drag state
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  // Public position for template
  position = { x: 0, y: 0 };

  // To distinguish click from drag
  private dragStartTime = 0;

  constructor() {
    this.voiceService.connect();
    this.voiceService.audioPlaying.subscribe(playing => {
      this.isPlaying = playing;
    });

    // Listen for external triggers (e.g., negative feedback)
    this.voiceService.mascotTrigger$.subscribe(message => {
      console.log('Mascot Triggered:', message);
      this.greetingMessage = message;
      this.isModalOpen = true;
    });
  }

  ngOnDestroy() {
    this.voiceService.stopRecording();
  }

  toggleRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.voiceService.stopRecording();
    } else {
      this.isRecording = true;
      this.voiceService.startRecording();
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.dragStartTime = Date.now();

    // Prevent default to stop text selection etc.
    if (event instanceof MouseEvent) {
      event.preventDefault();
      this.startX = event.clientX - this.currentX;
      this.startY = event.clientY - this.currentY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    event.preventDefault();
    this.currentX = event.clientX - this.startX;
    this.currentY = event.clientY - this.startY;
    this.position = { x: this.currentX, y: this.currentY };
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  openModal() {
    // Only open if it wasn't a drag operation (short duration)
    const dragDuration = Date.now() - this.dragStartTime;
    console.log('Mascot click duration:', dragDuration);

    if (dragDuration < 500) {
      console.log('Opening Mascot Modal');
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    // Reset position to back to right side as requested
    this.position = { x: 0, y: 0 };
    this.currentX = 0;
    this.currentY = 0;
  }
}
