import { ToastrService } from 'ngx-toastr';
import { AdvertService } from './../../../services/advert.service';
import { Advert } from './../../../models/advert';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advert-delete',
  templateUrl: './advert-delete.component.html',
  styleUrls: ['./advert-delete.component.css'],
})
export class AdvertDeleteComponent implements OnInit {
  @Input() advert: Advert;
  @Output() deletedId = new EventEmitter<number>();

  constructor(
    private advertService: AdvertService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  deleteAdvert() {
    if (this.advert.id) {
      this.advertService.delete(this.advert.id).subscribe(
        (response) => {
          this.deletedId.emit(this.advert.id);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    }
  }
}
