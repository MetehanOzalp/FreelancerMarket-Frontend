import { WalletTransaction } from './walletTransaction';
import { Wallet } from './wallet';
import { OperationClaim } from './operationClaim';
import { Favorite } from './favorite';

export interface User {
  id?: number;
  name?: string;
  surName?: string;
  userName?: string;
  email?: string;
  password?: string;
  imagePath?: string;
  wallet?: Wallet;
  walletTransactions?: WalletTransaction[];
  favorities?: Favorite[];
  operationClaims?: OperationClaim[];
}
