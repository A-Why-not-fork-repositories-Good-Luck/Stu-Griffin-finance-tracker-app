import { RecordStoreI } from '../types/Record';
import { BankAccountI } from '../types/BankAccount';
import { BankAccountBackUpI } from './bankAccountBackUp';

export interface DataI {
	records: RecordStoreI;
	bankAccounts: Array<BankAccountI>;
	bankAccountsBackUp: Array<BankAccountBackUpI>;
}