import { MessageService } from './../../../services/message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit {
  @Input() sender: string;
  @Input() receiver: string;
  messages: Array<any>;
  dataLoaded: boolean = false;
  message: string;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    if (this.sender && this.receiver) {
      this.getMessageDetails();
    }
  }

  getMessageDetails() {
    this.messageService
      .getMessageDetail(this.sender, this.receiver)
      .subscribe((response) => {
        this.messages = response.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        });
        this.messages.sort(function (a, b) {
          return b.id - a.id;
        });
        this.dataLoaded = true;
      });
  }

  sendMessage() {
    if (this.message) {
      this.messageService.addMessage(
        this.sender,
        this.receiver,
        this.message,
        this.sender,
        this.receiver
      );
    }
    this.message = undefined;
  }
}
