import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private angularFirestore: AngularFirestore) {}

  async addMessage(
    sender: string,
    receiver: string,
    content: string,
    from: string,
    to: string
  ) {
    var id = Date.now().toString();
    this.angularFirestore.collection(sender).doc(receiver).set({});
    this.angularFirestore.collection(receiver).doc(sender).set({});
    var message = this.angularFirestore
      .collection(sender)
      .doc(receiver)
      .collection('Mesajlar');
    var backup = this.angularFirestore
      .collection(receiver)
      .doc(sender)
      .collection('Mesajlar');
    await message.doc(id).set({ content: content, from: from, to: to });
    await backup.doc(id).set({ content: content, from: from, to: to });
  }

  getUserMessages(userName: string) {
    return this.angularFirestore.collection(userName).snapshotChanges();
  }

  getMessageDetail(sender: string, receiver: string) {
    return this.angularFirestore
      .collection(sender)
      .doc(receiver)
      .collection('Mesajlar')
      .snapshotChanges();
  }
}
