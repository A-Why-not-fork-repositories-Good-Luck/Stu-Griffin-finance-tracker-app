import { v4 as uuidv4 } from 'uuid';
import { BankAccountI } from '../types/bankAccount';

export const bankAccountFormState: BankAccountI = {
	title: '',
	ammount: 0,
	id: uuidv4(),
	currency: '',
};

export const bankAccountsStore: Array<BankAccountI> = [
	{
		id: '1',
		title: 'Cash',
		ammount: 500,
		currency: 'UAH',
	},
	{
		id: '2',
		title: 'My card',
		ammount: 2000,
		currency: 'UAH',
	},
	{
		id: '3',
		title: 'Stipendia',
		ammount: 20000,
		currency: 'UAH',
	},
	{
		id: '4',
		title: 'Investing',
		ammount: 250,
		currency: 'USD',
	}
];