import { TestBed } from '@angular/core/testing';

import { ExpiredTokenGuard } from './expired-token.guard';

describe('ExpiredTokenGuard', () => {
  let guard: ExpiredTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExpiredTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
