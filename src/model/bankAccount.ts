import { BankAccountI } from '../types/bankAccount';

export const currency = ['USD', 'EUR', 'UAH'];

export const bankAccountFormState: BankAccountI = {
	id: '',
	title: '',
	ammount: '',
	currency: '',
};

export const bankAccountsStore: Array<BankAccountI> = [
	{
		id: '1',
		title: 'Cash',
		ammount: '1234',
		currency: 'UAH',
	},
	{
		id: '2',
		title: 'Card debit',
		ammount: '3432',
		currency: 'USD',
	},
	{
		id: '3',
		title: 'Card credit',
		ammount: '566',
		currency: 'UAH',
	},
	{
		id: '4',
		title: 'Bank account',
		ammount: '6765',
		currency: 'EUR',
	},
];