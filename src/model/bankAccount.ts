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
		ammount: '134',
		currency: 'UAH',
	},
	{
		id: '2',
		title: 'Card',
		ammount: '356',
		currency: 'EUR',
	}
];