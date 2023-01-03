import { StatusBar } from 'expo-status-bar';
import { RecordStoreI } from '../types/Record';
import BalanceChart from './Charts/BalanceChart';
import RecordsChart from './Charts/RecordsChart';
import AddIcon from '../../assets/icons/AddIcon';
import { deleteRecords } from '../redux/records';
import { BankAccountI } from '../types/BankAccount';
import { getSaveData } from '../controller/MainPage';
import { navigationType } from '../types/Navigation';
import RecordsHistory from './Record/RecordsHistory';
import { notification } from '../controller/reusable';
import React, { ReactElement, useEffect } from 'react';
import BankAccounts from './Bank-account/BankAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../types/redux';
import { useNavigation } from '@react-navigation/native';
import { deleteBankAccounts } from '../redux/bankAccount';
import { BankAccountBackUpI } from '../types/bankAccountBackUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteBankAccountsBackUp, addBankAccountBackUp } from '../redux/bankAccountBackUp';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, AppState, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MainPage(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const navigation: navigationType = useNavigation();
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);
	const bankAccountsBackUp: Array<BankAccountBackUpI> = useSelector((state: RootState) => state.bankAccountsBackUp);

	useEffect(() => {
		const arr = bankAccountsBackUp.filter((bankAccountbackUp: BankAccountBackUpI) => bankAccountbackUp.date === JSON.parse(JSON.stringify(new Date())).split('T')[0]);
		bankAccounts.map((bankAccount: BankAccountI) => {
			arr.map((bankAccountbackUp: BankAccountBackUpI) => {
				if(bankAccount.id !== bankAccountbackUp.id) {
					dispatch(addBankAccountBackUp({
						id: bankAccount.id,
						ammount: bankAccount.ammount,
						date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
					}));
				}
			});
		});
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			getSaveData(nextAppState, dispatch, {records, bankAccounts, bankAccountsBackUp});
		});
		
		return () => {
			subscription.remove();
		};
	}, [bankAccounts, records, bankAccountsBackUp]);

	const deleteAllData = async (): Promise<void> => {
		try {
			await AsyncStorage.removeItem('records');
			await AsyncStorage.removeItem('balances');
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

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={deleteAllData} style={{borderRadius: 10, borderWidth: 1, borderColor: 'black', padding: 2, marginTop: 20}}>
				<Text>Delete</Text>
			</TouchableOpacity>
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
