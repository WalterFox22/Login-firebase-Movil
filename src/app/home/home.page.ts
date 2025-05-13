import { Component, OnInit } from '@angular/core';

import { ChatService, Message } from '../services/chat.service';

import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   messages: Message[] = [];
  newMessage: string = '';
  currentUserEmail: string = '';

  constructor(
    private chatService: ChatService,
    private auth: Auth // ✅ inyectar el Auth de Firebase
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUserEmail = user.email ?? 'Anónimo';
      }
    });

    this.chatService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage, this.currentUserEmail);
      this.newMessage = '';
    }
  }
}



