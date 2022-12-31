import { ActionI } from '../types/reusable';
import { addRecord } from '../redux/records';
import { AppDispatch } from '../types/redux';
import { changeBalance } from '../redux/balance';
import { BankAccountI } from '../types/BankAccount';
import { RecordI, RecordStoreI } from '../types/Record';
import { changeBankAccount } from '../redux/bankAccount';

export const getRecordAmmountStyle = (recordType: string): object => {
	return(
		(recordType === 'income') ? {color: 'green'} : {color: 'red'}
	);
};

export const getRecordAmmountSymbol = (recordType: string): string => {
	return(
		(recordType === 'income') ? '+' : '-'
	);
};

export const constructListData = (records: RecordStoreI): Array<RecordI> => {
	const arr: Array<RecordI> = [];
	const objectKeys = Object.keys(records);
	objectKeys.map((el: string) => {
		arr.push(...records[el]);
	});
	return arr;
};

export 	const constructStyleObjForButton = (el: string, state: RecordI): object => {
	return (el.toLowerCase() === state.recordType) ? {backgroundColor: '#236F57'} : {borderColor: '#236F57', borderWidth: 2};
};

export const recordReducer = (state: RecordI, {type, payload}: ActionI): RecordI => {
	switch (type) {
	case 'add':
		return {...state, [payload.key]: payload.value};
	default:
		return state;
	}
};

export const constructStyleObjForTextButton = (el: string, state: RecordI): object => {
	return (el.toLowerCase() === state.recordType) ? {color: 'white'} : {color: '#236F57',};
};

export const createRecord = (dispatch: AppDispatch, state: RecordI, key: string, bankAccounts: Array<BankAccountI>): void => {
	dispatch(addRecord({state, key}));

	dispatch(changeBankAccount({
		recordType: state.recordType,
		recordAmmount: state.ammount,
		bankAccountId: state.bankAccountId,
	}));
		
	const balance: number = (state.recordType === 'outcome') ?
		bankAccounts.reduce((res: number, el: BankAccountI) => res + +el.ammount, 0) - +state.ammount :
		bankAccounts.reduce((res: number, el: BankAccountI) => res + +el.ammount, 0) + +state.ammount;

	dispatch(changeBalance({
		date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
		balance: balance,
	}));
};