import { TestBed } from '@angular/core/testing';

import { AdvertCommentService } from './advert-comment.service';

describe('AdvertCommentService', () => {
  let service: AdvertCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
