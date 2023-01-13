import { RecordStoreI } from "./Record";
import { BankAccountI } from "./BankAccount";
import { BankAccountBackUpI } from "./bankAccountBackUp";

export interface DataI {
  records: RecordStoreI;
  bankAccounts: Array<BankAccountI>;
  bankAccountsBackUp: Array<BankAccountBackUpI>;
}
