import { TestBed } from '@angular/core/testing';

import { TopCategoryService } from './top-category.service';

describe('TopCategoryService', () => {
  let service: TopCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
