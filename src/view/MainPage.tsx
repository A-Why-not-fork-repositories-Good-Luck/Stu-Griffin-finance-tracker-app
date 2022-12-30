import { RootState } from '../types/redux';
import { BalanceI } from '../types/Balance';
import { StatusBar } from 'expo-status-bar';
import { setRecords } from '../redux/records';
import { RecordStoreI } from '../types/Record';
import { setBalances } from '../redux/balance';
import BalanceChart from './Charts/BalanceChart';
import RecordsChart from './Charts/RecordsChart';
import AddIcon from '../../assets/icons/AddIcon';
import { BankAccountI } from '../types/BankAccount';
import { navigationType } from '../types/Navigation';
import RecordsHistory from './Record/RecordsHistory';
import React, { ReactElement, useEffect } from 'react';
import BankAccounts from './Bank-account/BankAccounts';
import { setBankAccounts } from '../redux/bankAccount';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, AppState } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainPage(): ReactElement {
	const dispatch = useDispatch();
	const navigation: navigationType = useNavigation();
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	const balances: Array<BalanceI> = useSelector((state: RootState) => state.balances);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	// AsyncStorage.removeItem('records');
	// AsyncStorage.removeItem('balances');
	// AsyncStorage.removeItem('bank-accounts');

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			switch(nextAppState) {
			case 'active':
				getDataFromAsyncStorage('records');
				getDataFromAsyncStorage('balances');
				getDataFromAsyncStorage('bank-accounts');
				break;
			case 'background':
				setDataFromAsyncStorage('records', JSON.stringify(records));
				setDataFromAsyncStorage('balances', JSON.stringify(balances));
				setDataFromAsyncStorage('bank-accounts', JSON.stringify(bankAccounts));
				break;
			default:
			}
		});
		
		return () => {
			subscription.remove();
		};
	}, [bankAccounts, records]);

	const getDataFromAsyncStorage = async(key: string): Promise<void> => {
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

	const setDataFromAsyncStorage = async(key: string, value: string): Promise<void> => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch(e) {
			showMessage({
				type: 'danger',
				message: 'Something went wrong',
			});
		}
	};
	return (
		<View style={styles.container}>
			<ScrollView style={{
				zIndex: 1,
				paddingTop: 10,
				height: windowHeight,
			}} contentContainerStyle={{
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<BankAccounts/>
				<BalanceChart/>
				<RecordsChart/>
				<RecordsHistory/>
			</ScrollView>
			<TouchableOpacity
				style={styles.addIcon}
				onPress={() => navigation.navigate('create-record-page')}
			>
				<AddIcon
					width={60}
					height={60}
					fillCross={'white'}
					fillRound={'#236F57'}
				/>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	addIcon: {
		zIndex: 100,
		position: 'absolute',
		top: windowHeight - 75,
		left: windowWidth - 75,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
