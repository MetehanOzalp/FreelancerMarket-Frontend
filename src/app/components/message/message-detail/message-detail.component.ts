import { UserService } from './../../../services/user.service';
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
  userImages: Array<any> = [];
  message: string;
  imageLoaded: boolean = false;
  userNames: string[] = [];

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.messages = [];
    this.userNames = [];
    if (this.sender && this.receiver) {
      this.userNames.push(this.sender, this.receiver);
      this.getUserImages();
      this.getMessageDetails();
    }
  }

  ngOnChanges() {
    this.dataLoaded = false;
    this.ngOnInit();
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

  getUserImages() {
    if (
      !(
        this.userImages.find((x) => x.key == this.sender) &&
        this.userImages.find((x) => x.key == this.receiver)
      )
    ) {
      this.userService.getUserImages(this.userNames).subscribe((response) => {
        let path = '';
        Object.keys(response.data).forEach((key) => {
          var obj1 = response.data[key];
          Object.keys(obj1).forEach((key1) => {
            path += obj1[key1];
          });
          this.userImages.push({ key: key, value: path });
          path = '';
        });
        this.imageLoaded = true;
      });
    }
  }

  getUserImage(userName: string) {
    let path = '';
    this.userImages.forEach((element) => {
      if (element.key == userName) {
        path = element.value;
      }
    });
    return path;
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
