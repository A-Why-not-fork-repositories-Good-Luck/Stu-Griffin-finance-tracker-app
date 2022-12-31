import { BalanceI } from '../types/Balance';
import { StatusBar } from 'expo-status-bar';
import { RecordStoreI } from '../types/Record';
import BalanceChart from './Charts/BalanceChart';
import RecordsChart from './Charts/RecordsChart';
import AddIcon from '../../assets/icons/AddIcon';
import { changeBalance } from '../redux/balance';
import { BankAccountI } from '../types/BankAccount';
import { getSaveData } from '../controller/MainPage';
import { navigationType } from '../types/Navigation';
import RecordsHistory from './Record/RecordsHistory';
import React, { ReactElement, useEffect } from 'react';
import BankAccounts from './Bank-account/BankAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../types/redux';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, AppState } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function MainPage(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const navigation: navigationType = useNavigation();
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	const balances: Array<BalanceI> = useSelector((state: RootState) => state.balances);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	// AsyncStorage.removeItem('records');
	// AsyncStorage.removeItem('balances');
	// AsyncStorage.removeItem('bank-accounts');

	useEffect(() => {
		dispatch(changeBalance({
			date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
			balance: bankAccounts.reduce((res: number, el: BankAccountI): number => res + +el.ammount, 0),
		}));
		const subscription = AppState.addEventListener('change', nextAppState => {
			getSaveData(nextAppState, dispatch, {records, balances, bankAccounts});
		});
		
		return () => {
			subscription.remove();
		};
	}, [bankAccounts, records]);

	return (
		<View style={styles.container}>
			<ScrollView style={{
				zIndex: 1,
				paddingTop: 10,
				height: height,
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
		top: height - 75,
		left: width - 75,
		position: 'absolute',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
