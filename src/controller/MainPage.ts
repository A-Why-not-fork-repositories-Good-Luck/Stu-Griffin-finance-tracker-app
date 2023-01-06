import { notification } from './reusable';
import { DataI } from '../types/MainPage';
import { AppDispatch } from '../types/redux';
import { BankAccountI } from '../types/BankAccount';
import { showMessage } from 'react-native-flash-message';
import { setRecords, deleteRecords } from '../redux/records';
import { BankAccountBackUpI } from '../types/bankAccountBackUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBankAccounts, deleteBankAccounts } from '../redux/bankAccount';
import { setBankAccountsBackUp, deleteBankAccountsBackUp, addBankAccountBackUp } from '../redux/bankAccountBackUp';

export const deleteAllData = async (dispatch: AppDispatch): Promise<void> => {
	try {
		await AsyncStorage.removeItem('records');
		await AsyncStorage.removeItem('bank-accounts');
		await AsyncStorage.removeItem('bank-accounts-back-up');
		dispatch(deleteRecords());
		dispatch(deleteBankAccounts());
		dispatch(deleteBankAccountsBackUp());
		notification('success', 'Data was deleted');
	} catch(e) {
		notification('danger', 'Something went wrong');
	}
};

export const setDataFromAsyncStorage = async(key: string, value: string): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch(e) {
		showMessage({
			type: 'danger',
			message: 'Something went wrong',
		});
	}
};

export const getSaveData = (nextAppState: string, dispatch: AppDispatch, data: DataI): void => {
	switch(nextAppState) {
	case 'active':
		getDataFromAsyncStorage('records', dispatch);
		getDataFromAsyncStorage('bank-accounts', dispatch);
		getDataFromAsyncStorage('bank-accounts-back-up', dispatch);
		break;
	case 'background':
		setDataFromAsyncStorage('records', JSON.stringify(data.records));
		setDataFromAsyncStorage('bank-accounts', JSON.stringify(data.bankAccounts));
		setDataFromAsyncStorage('bank-accounts-back-up', JSON.stringify(data.bankAccountsBackUp));
		break;
	default:
	}
};

export const getDataFromAsyncStorage = async(key: string, dispatch: AppDispatch): Promise<void> => {
	try {
		let result: string|null|[] = await AsyncStorage.getItem(key);
		(typeof result === 'string') ? result = JSON.parse(result) : result = [];
		switch(key) {
		case 'records':
			dispatch(setRecords(result));
			break;
		case 'bank-accounts':
			dispatch(setBankAccounts(result));
			break;
		case 'bank-accounts-back-up':
			dispatch(setBankAccountsBackUp(result));
			break;
		default:
		}
	} catch(e) {
		showMessage({
			type: 'danger',
			message: 'Something went wrong',
		});
	}
};

export const createFirstBankAccountBackUpByDate = (dispatch: AppDispatch, bankAccountsBackUp: Array<BankAccountBackUpI>, bankAccounts: Array<BankAccountI>): void => {
	const arr = bankAccountsBackUp.filter((bankAccountbackUp: BankAccountBackUpI) => bankAccountbackUp.date !== JSON.parse(JSON.stringify(new Date())).split('T')[0]);
	bankAccounts.map((bankAccount: BankAccountI) => {
		arr.map((bankAccountbackUp: BankAccountBackUpI) => {
			if(bankAccount.id === bankAccountbackUp.id) {
				dispatch(addBankAccountBackUp({
					id: bankAccount.id,
					ammount: bankAccount.ammount,
					date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
				}));
			}
		});
	});
};