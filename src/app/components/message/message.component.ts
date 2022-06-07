import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() newReceiver: string;
  userName: string;
  selectedUserName: string;
  messages: Array<any>;
  userImages: Array<any> = [];
  dataLoaded: boolean = false;
  imageLoaded: boolean = false;
  filterText: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private jwtHelperSevice: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.userName = this.jwtHelperSevice.decodeToken(
      localStorage.getItem('token')
    ).sub;
    this.activatedRoute.params.subscribe((params) => {
      if (params['userName']) {
        this.selectedUserName = params['userName'];
      }
    });
    this.getUserMessages();
  }

  getUserMessages() {
    this.messageService.getUserMessages(this.userName).subscribe((response) => {
      let userNames: string[] = [];
      userNames.push(this.userName);
      this.messages = response.map((e) => {
        userNames.push(e.payload.doc.id);
        return {
          id: e.payload.doc.id,
        };
      });
      if (this.selectedUserName) {
        var isThere = false;
        this.messages.forEach((element) => {
          if (element.id == this.selectedUserName) {
            isThere = true;
          }
        });
        if (!isThere) {
          this.messages.unshift({ id: this.selectedUserName });
          userNames.push(this.selectedUserName);
        }
      }
      this.dataLoaded = true;
      this.getUserImages(userNames);
    });
  }

  getUserImages(userNames: string[]) {
    this.userService.getUserImages(userNames).subscribe((response) => {
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

  getUserImage(userName: string) {
    let path = '';
    this.userImages.forEach((element) => {
      if (element.key == userName) {
        path = element.value;
      }
    });
    return path;
  }

  selectUserName(userName: any) {
    this.selectedUserName = userName;
    var url = this.router.url;
    if (url.includes('/freelancer/panel/messages')) {
      this.router.navigate([
        '/freelancer/panel/messages/' + this.selectedUserName,
      ]);
    } else {
      this.router.navigate(['/messages/' + this.selectedUserName]);
    }
  }
}
