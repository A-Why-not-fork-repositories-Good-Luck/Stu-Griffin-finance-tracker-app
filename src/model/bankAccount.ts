import { BankAccountI } from '../types/bankAccount';

export const bankAccountFormState: BankAccountI = {
	id: '',
	title: '',
	ammount: '',
	currency: '',
};

export const bankAccountsStore: Array<BankAccountI> = [];

export const currency: Array<string> = ['USD', 'EUR', 'UAH'];