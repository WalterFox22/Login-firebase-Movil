import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface Message {
  text: string;
  createdAt: number;
  sender: string;
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  getMessages(): Observable<Message[]> {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

 sendMessage(text: string, sender: string) {
  const messagesRef = collection(this.firestore, 'messages'); // <-- corregido
  const message: Message = {
    text,
    createdAt: Date.now(),
    sender,
  };
  return addDoc(messagesRef, message);
}

}
