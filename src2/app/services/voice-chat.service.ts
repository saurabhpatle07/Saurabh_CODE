import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class VoiceChatService {
    private socket: WebSocket | null = null;
    private mediaRecorder: MediaRecorder | null = null;
    private audioChunks: Blob[] = [];

    // Observable to notify component when audio is received and played
    public audioPlaying = new Subject<boolean>();

    // Trigger for Mascot Interactivity
    private mascotTriggerSubject = new Subject<string>();
    mascotTrigger$ = this.mascotTriggerSubject.asObservable();

    constructor() { }

    triggerMascot(message: string) {
        this.mascotTriggerSubject.next(message);
    }

    connect(url: string = 'ws://localhost:8000/ws') {
        if (this.socket) return;

        this.socket = new WebSocket(url);

        this.socket.onmessage = async (event) => {
            console.log('Message received from server', event.data);
            try {
                let audioBlob: Blob;
                if (event.data instanceof Blob) {
                    audioBlob = event.data;
                } else if (event.data instanceof ArrayBuffer) {
                    audioBlob = new Blob([event.data], { type: 'audio/wav' });
                } else if (typeof event.data === 'string') {
                    const base64Response = await fetch(`data:audio/wav;base64,${event.data}`);
                    audioBlob = await base64Response.blob();
                } else {
                    return;
                }
                this.playAudio(audioBlob);
            } catch (error) {
                console.error('Error processing audio from WebSocket:', error);
            }
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket closed');
            this.socket = null;
        };
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' }); // Or webm/opus
                this.sendAudio(audioBlob);

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            console.log('Recording started');
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            console.log('Recording stopped');
        }
    }

    private sendAudio(blob: Blob) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(blob);
            console.log('Audio sent to server');
        } else {
            console.warn('WebSocket not connected. Cannot send audio.');
        }
    }

    private playAudio(blob: Blob) {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        this.audioPlaying.next(true);

        audio.play().catch(e => console.error('Error playing audio:', e));

        audio.onended = () => {
            this.audioPlaying.next(false);
            URL.revokeObjectURL(audioUrl);
        };
    }
}
