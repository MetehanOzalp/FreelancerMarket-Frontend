import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertCommentResponseAddComponent } from './advert-comment-response-add.component';

describe('AdvertCommentResponseAddComponent', () => {
  let component: AdvertCommentResponseAddComponent;
  let fixture: ComponentFixture<AdvertCommentResponseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertCommentResponseAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertCommentResponseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
