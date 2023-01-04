import { ActionI } from '../types/reusable';
import { AppDispatch } from '../types/redux';
import { RecordI, RecordStoreI } from '../types/Record';
import { changeBankAccount } from '../redux/bankAccount';
import { changeBankAccountBackUp } from '../redux/bankAccountBackUp';
import { addRecord, putRecord, deleteRecord } from '../redux/records';

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

export const deleteAction = (dispatch: AppDispatch, record: RecordI): void => {
	dispatch(changeBankAccount({
		status: 'update',
		recordAmmount: record.ammount,
		recordType: record.recordType,
		bankAccountId: record.bankAccountId,
	}));
	dispatch(deleteRecord(record));
	dispatch(changeBankAccountBackUp({
		status: 'update',
		date: record.date,
		ammount: record.ammount,
		id: record.bankAccountId,
		recordType: record.recordType,
	}));
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

export const createRecord = (dispatch: AppDispatch, state: RecordI, key: string): void => {
	dispatch(changeBankAccount({
		status: 'create',
		recordType: state.recordType,
		recordAmmount: state.ammount,
		bankAccountId: state.bankAccountId,
	}));
	dispatch(addRecord({state, key}));
	dispatch(changeBankAccountBackUp({
		status: 'create',
		date: state.date,
		ammount: state.ammount,
		id: state.bankAccountId,
		recordType: state.recordType,
	}));
};

export const updateRecord = (dispatch: AppDispatch, state: RecordI, key: string, ammountBackUp: string): void => {
	dispatch(putRecord({state, key}));
	let newAmmount;
	switch(state.recordType) {
	case 'income':
		newAmmount = +ammountBackUp + +state.ammount;
		break;
	case 'outcome':
		newAmmount = +ammountBackUp - +state.ammount;
		break;
	default:
		break;
	}
	dispatch(changeBankAccountBackUp({
		status: 'update',
		date: state.date,
		ammount: state.ammount,
		id: state.bankAccountId,
		recordType: state.recordType,
	}));
	dispatch(changeBankAccount({
		status: 'update',
		recordAmmount: newAmmount,
		recordType: state.recordType,
		bankAccountId: state.bankAccountId,
	}));
};