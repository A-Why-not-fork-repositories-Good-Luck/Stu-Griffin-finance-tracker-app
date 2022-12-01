import { BankAccountI } from '../types/bankAccount';
import { ActionI } from '../types/componentReducer';

export function bankAccountReducer(state: BankAccountI, {type, payload}: ActionI) {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
}