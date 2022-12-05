import { BankAccountI } from '../types/bankAccount';

export const currency = ['USD', 'EUR', 'UAH'];

export const bankAccountFormState: BankAccountI = {
	id: '',
	title: '',
	ammount: '',
	currency: '',
};

export const bankAccountsStore: Array<BankAccountI> = [];