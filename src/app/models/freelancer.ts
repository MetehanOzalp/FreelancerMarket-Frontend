import { FreelancerComment } from './freelancerComment';
import { User } from './user';
import { Skill } from './skill';
import { Favorite } from './favorite';
import { OperationClaim } from './operationClaim';
import { WalletTransaction } from './walletTransaction';
import { Wallet } from './wallet';
export interface Freelancer extends User {
  imagePath: string;
  about: string;
  appellation: string;
  wallet: Wallet;
  walletTransactions: WalletTransaction[];
  operationClaims: OperationClaim[];
  skills: Skill[];
  freelancerComments: FreelancerComment[];
}
