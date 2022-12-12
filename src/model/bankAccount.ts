import { BankAccountI } from '../types/bankAccount';

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
		ammount: '1245',
		currency: 'UAH',
	},
	{
		id: '2',
		title: 'Card',
		ammount: '214.578',
		currency: 'UAH',
	},
];

export const currency: Array<string> = ['USD', 'EUR', 'UAH'];