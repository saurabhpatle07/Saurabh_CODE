import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Resource {
  name: string;
  url: string;
}

export interface LearningStep {
  id: number;
  title: string;
  description: string;
  subtopics: string[];
  duration: string;
  resources: Resource[];
  videoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  // API endpoints
  private apiUrl = '/api/generate';
  private chatUrl = '/api/chat-audio';
  private learningPathUrl = '/api/generate-learning-path';

  // WebSocket connection
  private ws: WebSocket | null = null;
  private wsUrl = 'ws://localhost:8000/ws/audio-chat';

  // Subjects for WebSocket messages
  public messages$ = new Subject<any>();
  public connectionStatus$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  generatePath(topic: string): Observable<any> {
    return this.http.post(this.apiUrl, { topic });
  }

  sendAudio(audioBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'user_voice.webm');
    return this.http.post(this.chatUrl, formData);
  }

  // Generate learning path based on conversation
  generateLearningPath(studentId: string = 'default_student'): Observable<LearningStep[]> {
    return this.http.post<LearningStep[]>(this.learningPathUrl, { student_id: studentId });
  }

  // WebSocket Methods
  connectWebSocket(): void {
    if (this.ws) {
      console.log('WebSocket already connected');
      return;
    }

    this.ws = new WebSocket(this.wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.connectionStatus$.next(true);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messages$.next(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionStatus$.next(false);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.connectionStatus$.next(false);
      this.ws = null;
    };
  }

  sendAudioViaWebSocket(audioBlob: Blob): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    // Convert blob to base64 and send
    const reader = new FileReader();
    reader.onload = () => {
      const base64Audio = (reader.result as string).split(',')[1];
      this.ws!.send(JSON.stringify({
        type: 'audio',
        data: base64Audio
      }));
    };
    reader.readAsDataURL(audioBlob);
  }

  disconnectWebSocket(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isWebSocketConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}
