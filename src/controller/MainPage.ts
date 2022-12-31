import { DataI } from '../types/MainPage';
import { AppDispatch } from '../types/redux';
import { setRecords } from '../redux/records';
import { setBalances } from '../redux/balance';
import { setBankAccounts } from '../redux/bankAccount';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSaveData = (nextAppState: string, dispatch: AppDispatch, data: DataI) => {
	switch(nextAppState) {
	case 'active':
		getDataFromAsyncStorage('records', dispatch);
		getDataFromAsyncStorage('balances', dispatch);
		getDataFromAsyncStorage('bank-accounts', dispatch);
		break;
	case 'background':
		setDataFromAsyncStorage('records', JSON.stringify(data.records));
		setDataFromAsyncStorage('balances', JSON.stringify(data.balances));
		setDataFromAsyncStorage('bank-accounts', JSON.stringify(data.bankAccounts));
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
		case 'balances':
			dispatch(setBalances(result));
			break;
		case 'bank-accounts':
			dispatch(setBankAccounts(result));
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