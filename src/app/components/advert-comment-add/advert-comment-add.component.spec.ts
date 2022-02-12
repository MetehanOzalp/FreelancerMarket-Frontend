import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertCommentAddComponent } from './advert-comment-add.component';

describe('AdvertCommentAddComponent', () => {
  let component: AdvertCommentAddComponent;
  let fixture: ComponentFixture<AdvertCommentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertCommentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertCommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
