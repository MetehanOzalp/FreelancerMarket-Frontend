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
  dataLoaded: boolean = false;

  constructor(
    private router: Router,
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
      this.messages = response.map((e) => {
        return {
          id: e.payload.doc.id,
        };
      });
      this.dataLoaded = true;
      if (this.selectedUserName) {
        var isThere = false;
        this.messages.forEach((element) => {
          if (element.id == this.selectedUserName) {
            isThere = true;
          }
        });
        if (!isThere) {
          this.messages.unshift({ id: this.selectedUserName });
        }
      }
    });
  }

  selectUserName(userName: any) {
    this.selectedUserName = userName;
    var url = this.router.url;
    if (url.includes('/freelancer/panel/messages')) {
      this.router
        .navigateByUrl('/freelancer/panel/messages', {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([
            '/freelancer/panel/messages/' + this.selectedUserName,
          ]);
        });
    } else {
      this.router
        .navigateByUrl('/messages', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/messages/' + this.selectedUserName]);
        });
    }
  }
}
