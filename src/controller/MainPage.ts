import { DataI } from '../types/MainPage';
import { AppDispatch } from '../types/redux';
import { setRecords } from '../redux/records';
import { setBankAccounts } from '../redux/bankAccount';
import { showMessage } from 'react-native-flash-message';
import { setBankAccountsBackUp } from '../redux/bankAccountBackUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSaveData = (nextAppState: string, dispatch: AppDispatch, data: DataI) => {
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