import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  tabs: any[] = [
    { title: 'İlan Ekle', icon: 'bi bi-plus-circle', url: 'advert/add' },
    { title: 'İlanlarım', icon: 'bi bi-card-list', url: 'my-adverts' },
    { title: 'Siparişlerim', icon: 'bi bi-box-seam', url: 'orders' },
    { title: 'Cüzdanım', icon: 'bi bi-wallet2', url: 'wallet' },
    { title: 'Mesajlarım', icon: 'bi bi-envelope', url: 'messages' },
    { title: 'Yorumlarım', icon: 'bi bi-text-center', url: 'comments' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
