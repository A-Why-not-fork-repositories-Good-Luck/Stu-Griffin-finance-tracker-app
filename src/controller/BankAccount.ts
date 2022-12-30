import { ActionI } from '../types/reusable';
import { BankAccountI } from '../types/BankAccount';

export function bankAccountReducer(state: BankAccountI, {type, payload}: ActionI): BankAccountI {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
}