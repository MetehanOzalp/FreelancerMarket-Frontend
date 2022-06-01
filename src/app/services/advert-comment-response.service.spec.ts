import { TestBed } from '@angular/core/testing';

import { AdvertCommentResponseService } from './advert-comment-response.service';

describe('AdvertCommentResponseService', () => {
  let service: AdvertCommentResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertCommentResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
