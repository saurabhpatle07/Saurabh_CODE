import { Component, EventEmitter, OnDestroy, Output, ElementRef, ViewChild, AfterViewChecked, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningPathService } from '../../learning-path.service';

@Component({
  selector: 'app-audio-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-modal.html',
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;
    }
    .modal-content {
      background: white; width: 400px; height: 600px; border-radius: 12px;
      display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    .chat-bubble { padding: 10px 15px; max-width: 80%; word-wrap: break-word; font-size: 0.95rem; }
    .bot-bubble { background: #e0e0e0; border-radius: 15px 15px 15px 0; color: #333; }
    .user-bubble { background: #6200ea; color: white; border-radius: 15px 15px 0 15px; }
    
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
  `]
})
export class AudioModal implements OnDestroy, AfterViewChecked {
  @Output() close = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  chatHistory: { sender: 'bot' | 'user', text: string }[] = [];

  isRecording: boolean = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: any[] = [];

  constructor(
    private learningPathService: LearningPathService,
    private ngZone: NgZone, // 1. Inject NgZone
    private cdr: ChangeDetectorRef // 2. Inject ChangeDetectorRef
  ) {
    const greeting = "Hello! I am your AI Buddy. Hold the mic button to talk to me.";
    this.chatHistory.push({ sender: 'bot', text: greeting });
    setTimeout(() => this.speak(greeting), 500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  cleanup() {
    if (this.isRecording && this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
    if (this.mediaRecorder) {
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    window.speechSynthesis.cancel();
  }

  finishConversation() {
    this.cleanup();
    this.close.emit();
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  async startRecording() {
    window.speechSynthesis.cancel();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        // 3. WRAP IN NGZONE: Ensures Angular knows this async event happened
        this.ngZone.run(() => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.sendAudioToBackend(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        });
      };

      this.mediaRecorder.start();
      // Ensure UI update for recording state
      this.ngZone.run(() => {
        this.isRecording = true;
      });

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert("Please allow microphone access.");
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.ngZone.run(() => {
        this.isRecording = false;
      });
    }
  }

  sendAudioToBackend(audioBlob: Blob) {
    this.chatHistory.push({ sender: 'user', text: '🎤 ...' });

    this.learningPathService.sendAudio(audioBlob).subscribe({
      next: (data) => {
        // 4. WRAP RESPONSE IN NGZONE & FIX TYPO
        this.ngZone.run(() => {
          this.chatHistory.pop();
          console.log("data is....", data);

          this.chatHistory.push({ sender: 'user', text: data.transcription });

          // Fixed typo: data.response_text -> data.bot_response
          // Your Python backend sends "bot_response", not "response_text"
          const botReply = data.response_text || "I didn't catch that.";

          this.chatHistory.push({ sender: 'bot', text: botReply });
          this.speak(botReply);

          // 5. Force UI Update immediately
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error(err);
          this.chatHistory.pop();
          const errMsg = "Sorry, I couldn't hear that properly.";
          this.chatHistory.push({ sender: 'bot', text: errMsg });
          this.speak(errMsg);
          this.cdr.detectChanges();
        });
      }
    });
  }
}