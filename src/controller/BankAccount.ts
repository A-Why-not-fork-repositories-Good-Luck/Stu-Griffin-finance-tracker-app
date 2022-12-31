import { v4 as uuidv4 } from 'uuid';
import { stateAction } from './reusable';
import { AppDispatch } from '../types/redux';
import { currency } from '../model/bankAccount';
import { changeBalance } from '../redux/balance';
import { BankAccountI } from '../types/BankAccount';
import { ActionI, DispatchStateI } from '../types/reusable';
import { addBankAccount, rewriteBankAccounts } from '../redux/bankAccount';

export const bankAccountReducer = (state: BankAccountI, {type, payload}: ActionI): BankAccountI => {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
};

export 	const getInitialData = (dispatchState: DispatchStateI, bankAccounts: Array<BankAccountI>, cardId: string) => {
	const foundBankAccount: BankAccountI|undefined = bankAccounts.find((el: BankAccountI) => el.id === cardId);
	stateAction(dispatchState, 'add', 'title', foundBankAccount?.title || '');
	stateAction(dispatchState, 'add', 'id', foundBankAccount?.id || uuidv4());
	stateAction(dispatchState, 'add', 'ammount', foundBankAccount?.ammount || '');
	stateAction(dispatchState, 'add', 'currency', foundBankAccount?.currency || currency[0]);
};

export const createBankAccount = (cardId: string, dispatch: AppDispatch, bankAccounts: Array<BankAccountI>, state: BankAccountI) => {
	(cardId === '') ? dispatch(addBankAccount(state)) : dispatch(rewriteBankAccounts(state));
	dispatch(changeBalance({
		date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		balance: bankAccounts.reduce((res: number, el: BankAccountI): number => res + +el.ammount, 0) + +state.ammount,
	}));
};