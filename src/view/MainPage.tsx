import { StatusBar } from 'expo-status-bar';
import { RecordStoreI } from '../types/Record';
import BalanceChart from './Charts/BalanceChart';
import RecordsChart from './Charts/RecordsChart';
import AddIcon from '../../assets/icons/AddIcon';
import { BankAccountI } from '../types/BankAccount';
import { navigationType } from '../types/Navigation';
import RecordsHistory from './Record/RecordsHistory';
import React, { ReactElement, useEffect } from 'react';
import BankAccounts from './Bank-account/BankAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../types/redux';
import { useNavigation } from '@react-navigation/native';
import { BankAccountBackUpI } from '../types/bankAccountBackUp';
import { getSaveData, createFirstBankAccountBackUpByDate, deleteAllData } from '../controller/MainPage';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, AppState, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MainPage(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const navigation: navigationType = useNavigation();
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);
	const bankAccountsBackUp: Array<BankAccountBackUpI> = useSelector((state: RootState) => state.bankAccountsBackUp);

	useEffect(() => {
		createFirstBankAccountBackUpByDate(dispatch, bankAccountsBackUp, bankAccounts);
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			getSaveData(nextAppState, dispatch, {records, bankAccounts, bankAccountsBackUp});
		});
		
		return () => {
			subscription.remove();
		};
	}, [bankAccounts, records, bankAccountsBackUp]);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 5, marginTop: 30}} onPress={() => deleteAllData(dispatch)}>
				<Text>Delete</Text>
			</TouchableOpacity>
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
				<BankAccounts/>
				<BalanceChart/>
				<RecordsChart/>
				<RecordsHistory/>
			</ScrollView>
			<TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('create-record-page')}>
				<AddIcon width={60} height={60} fillCross={'white'} fillRound={'#236F57'}/>
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
	scrollView: {
		zIndex: 1,
		paddingTop: 10,
		height: height,
	},
	scrollViewContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	}
});
