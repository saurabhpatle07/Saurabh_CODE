import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mentor-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mentor-chat.html',
    styleUrl: './mentor-chat.css'
})
export class MentorChatComponent {

    mentors = [
        {
            id: 1,
            name: 'Sarah Wilson',
            role: 'Frontend Lead @ Google',
            avatar: '👩‍💻',
            status: 'online',
            expertise: 'Angular, UX'
        },
        {
            id: 2,
            name: 'James Chen',
            role: 'Senior Engineer @ Netflix',
            avatar: '👨‍💻',
            status: 'offline',
            expertise: 'Performance, RxJS'
        },
        {
            id: 3,
            name: 'Anita Roy',
            role: 'Full Stack Dev @ Amazon',
            avatar: '👩‍💼',
            status: 'online',
            expertise: 'Node.js, Cloud'
        }
    ];

    selectedMentor = this.mentors[0];

    messages = [
        {
            sender: 'mentor',
            text: 'Hi there! I see you are working on the Angular Masterclass. How is it going?',
            time: '10:00 AM'
        },
        {
            sender: 'user',
            text: 'Hey Sarah! It is going well, but I am struggling a bit with RxJS operators.',
            time: '10:02 AM'
        },
        {
            sender: 'mentor',
            text: 'That is completely normal! RxJS is tricky. Have you tried visualizing the streams?',
            time: '10:03 AM'
        }
    ];

    newMessage = '';

    selectMentor(mentor: any) {
        this.selectedMentor = mentor;
        // In a real app, this would fetch chat history
    }

    sendMessage() {
        if (!this.newMessage.trim()) return;

        this.messages.push({
            sender: 'user',
            text: this.newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        const userMsg = this.newMessage;
        this.newMessage = '';

        // Simulate reply
        setTimeout(() => {
            this.messages.push({
                sender: 'mentor',
                text: `That's a great question about "${userMsg}". Let me find a resource for you.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }, 1500);
    }
}
