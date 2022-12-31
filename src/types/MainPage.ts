import { BalanceI } from '../types/Balance';
import { RecordStoreI } from '../types/Record';
import { BankAccountI } from '../types/BankAccount';

export interface DataI {
	records: RecordStoreI;
	balances: Array<BalanceI>;
	bankAccounts: Array<BankAccountI>;
}