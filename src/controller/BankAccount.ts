import { v4 as uuidv4 } from 'uuid';
import { stateAction } from './reusable';
import { AppDispatch } from '../types/redux';
import { currency } from '../model/bankAccount';
import { BankAccountI } from '../types/BankAccount';
import { ActionI, DispatchStateI } from '../types/reusable';
import { addBankAccount, rewriteBankAccounts } from '../redux/bankAccount';
import { addBankAccountBackUp, rewriteBankAccountBackUp } from '../redux/bankAccountBackUp';

export const bankAccountReducer = (state: BankAccountI, {type, payload}: ActionI): BankAccountI => {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
};

export const createBankAccount = (cardId: string, dispatch: AppDispatch, state: BankAccountI): void => {
	if(cardId === '') {
		dispatch(addBankAccount(state));
		dispatch(addBankAccountBackUp({
			id: state.id,
			ammount: state.ammount,
			date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		}));
	} else {
		dispatch(rewriteBankAccountBackUp({
			id: state.id,
			ammount: state.ammount,
			date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		}));
		dispatch(rewriteBankAccounts(state));
	}
};

export 	const getInitialData = (dispatchState: DispatchStateI, bankAccounts: Array<BankAccountI>, cardId: string): void => {
	const foundBankAccount: BankAccountI|undefined = bankAccounts.find((el: BankAccountI) => el.id === cardId);
	stateAction(dispatchState, 'add', 'title', foundBankAccount?.title || '');
	stateAction(dispatchState, 'add', 'id', foundBankAccount?.id || uuidv4());
	stateAction(dispatchState, 'add', 'ammount', foundBankAccount?.ammount || '');
	stateAction(dispatchState, 'add', 'currency', foundBankAccount?.currency || currency[0]);
};