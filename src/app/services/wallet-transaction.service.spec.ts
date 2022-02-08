import { TestBed } from '@angular/core/testing';

import { WalletTransactionService } from './wallet-transaction.service';

describe('WalletTransactionService', () => {
  let service: WalletTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
